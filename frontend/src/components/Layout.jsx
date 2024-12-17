import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Navigation from "./Navigation";

function Layout({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user.isLoggedIn) {
    navigate("/login");
  }

  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
