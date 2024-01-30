import { NavLink } from "react-router-dom";

import { Button } from "@mui/material";
import logo from "../asets/logo1.png";

export default function Header() {
  console.log("Muda");
  return (
    <div className="header">
      <img src={logo} alt="" />
      <div className="actions">
        <Button size="large" variant="text">
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button size="large" variant="text">
          <NavLink to="/profile">My Profile</NavLink>
        </Button>
      </div>
      <Button sx={{ color: "#17252A" }} size="medium" variant="contained">
        Sign In
      </Button>
    </div>
  );
}
