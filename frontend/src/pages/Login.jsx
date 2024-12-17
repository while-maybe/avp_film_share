import { useState } from "react";
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

import api from "../api/axios";
import { useUser } from "../contexts/UserContext";

const LoginPage = () => {
  const { loginUser } = useUser();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/account/login", {
        username: userName,
        password: password,
      });

      if (response.data.status) {
        // Login the User to their Session using Context API
        loginUser(userName, password);

        console.log(response.data, "Login clicked");
        // Save the JWT Token to Local Storage
        localStorage.setItem("authToken", response.data.data.token);

        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 justify-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="User Name"
            size="lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={onClickLogin}>
            Log In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold">
              Sign Up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
