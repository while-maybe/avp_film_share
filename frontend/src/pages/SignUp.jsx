import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { useUser } from "../contexts/UserContext";
import Footer from "../components/Footer";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [shortAbout, setShortAbout] = useState("");
  const [about, setAbout] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useUser();

  const onClickSignUp = async (e) => {
    e.preventDefault();
    try {
      const signUpRes = await api.post("/auth/signup/", {
        username: userName,
        email: email,
        password: password,
        password2: password,
        about: about,
        short_about: shortAbout,
        title: title,
        firstname: firstname,
        lastname: lastname,
      });

      if (signUpRes.status === 201) {
        const loginRes = await api.post("/auth/login/", {
          username: userName,
          password: password,
        });

        if (loginRes.status === 200) {
          // Login the User to their Session using Context API
          loginUser(userName, password);

          // Save the JWT Token to Local Storage
          localStorage.setItem("authToken", loginRes.data.token);

          console.log("User signed up and logged in:", userName);
          navigate("/dashboard");
        }
      } else {
        setError("Could not sign up. Please try again.");
      }
    } catch (err) {
      setError("Invalid account details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <section className="grid text-center h-screen items-center p-8 justify-center">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="pick a username..."
              size="lg"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-900" />
            <Input
              label="Title"
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Firstname"
              size="lg"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Input
              label="Lastname"
              size="lg"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-900" />
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-900" />
            <Input
              label="short about"
              size="lg"
              value={shortAbout}
              onChange={(e) => setShortAbout(e.target.value)}
            />
            <Input
              label="about you (in < 1000 chars)"
              size="lg"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={onClickSignUp} fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold">
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default SignUpPage;
