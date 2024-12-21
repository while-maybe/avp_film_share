import { useUser } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEffect } from "react";

function Layout({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      const protectedRoutes = ["/new", "/delete"];
      if (!user.isLoggedIn && protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    },
    [user, location, navigate]
  );

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
