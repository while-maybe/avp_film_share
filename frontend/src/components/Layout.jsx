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
      const protectedRoutes = ["/add", "/delete"];
      if (!user.isLoggedIn && protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    },
    [user, location, navigate]
  );

  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
