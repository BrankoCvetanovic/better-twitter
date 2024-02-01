import { NavLink } from "react-router-dom";
import { useState } from "react";

import { Button } from "@mui/material";
import logo from "../asets/logo.png";
import LoginModal from "./LoginModal";
import { useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispacher = useAppDispatch();

  function HandleOpenMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleOpenLoginForm() {
    dispacher(authSliceActions.toggleFormOn());
  }

  return (
    <div className="header">
      <div
        onClick={HandleOpenMenu}
        className={isOpen ? "menu-btn open" : "menu-btn"}
      >
        <span className="menu-btn__burger"></span>
      </div>
      <div className={isOpen ? "nav open" : "nav"}>
        <img src={logo} alt="" />
        <div className={isOpen ? "actions open" : "actions"}>
          <Button size="large" variant="text">
            <NavLink to="/">Home</NavLink>
          </Button>
          <Button size="large" variant="text">
            <NavLink to="/profile">My Profile</NavLink>
          </Button>
        </div>
        <Button
          className="sign-btn"
          onClick={handleOpenLoginForm}
          sx={{ color: "#17252A" }}
          size="medium"
          variant="contained"
        >
          Sign In
        </Button>
      </div>
      <LoginModal />
    </div>
  );
}
