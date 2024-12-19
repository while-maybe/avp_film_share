import React from "react";
import {
  Avatar,
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";

import api from "../api/axios";
import logo from "/assets/edureel.png";

export default function Navigation() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { user, logoutUser } = useUser();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-10 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {user && user.isLoggedIn && (
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={() => navigate("/create")}>
          <span>New Video</span>
        </Button>
      )}
    </ul>
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/logout/");

      if (response.status === 200) {
        // delete the local token
        localStorage.removeItem("authToken");

        // Logout the user
        logoutUser();

        console.log("Goodbye", response.author, "Logout clicked");

        navigate("/dashboard");
      } else {
        setError("Not logged in");
      }
    } catch (err) {
      setError("Not logged in ");
    }
  };

  return (
    <div className="">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="logo" className="h-16" />
            </Link>
            <Typography
              as="a"
              href="/"
              className="mr-4 cursor-pointer py-1.5 font-medium">
              {/* EduReel video sharing */}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                color="black"
                label="enter the name of the expert you'd like to follow..."
                className="pr-30"
                containerProps={{
                  // className: "min-w-[288px]",
                  className: "min-w-[520px]",
                }}
              />
              <Button
                size="sm"
                color="white"
                className="!absolute right-1 top-1 rounded">
                Discover Now
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              {user && user.isLoggedIn && (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={() => navigate("/new")}>
                    <span>Add a video</span>
                  </Button>

                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleLogout}>
                    <span>Log Out</span>
                  </Button>

                  <Avatar
                    src={`https://i.pravatar.cc/50?u=${user.username}`}
                    alt="avatar"
                    variant="rounded"
                  />
                </>
              )}
              {!user ||
                (!user.isLoggedIn && (
                  <>
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                      onClick={() => navigate("/login")}>
                      <span>Log In</span>
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block"
                      onClick={() => navigate("/signup")}>
                      <span>Sign Up</span>
                    </Button>
                  </>
                ))}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="flex flex-col justify-center items-center bg-blue-gray-900 h-12 p-16">
        <Typography className="text-4xl text-blue-gray-100 font-bold mb-2 uppercase">
          EduReel video sharing
        </Typography>

        <Typography className="text-2xl text-blue-gray-100 font-bold">
          Curate your content, one video at a time
        </Typography>
      </div>
    </div>
  );
}
