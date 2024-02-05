import { NavLink } from "react-router-dom";
import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../asets/logo.png";
import LoginModal from "./LoginModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSliceActions } from "../store";

import "react-toastify/dist/ReactToastify.css";
import { clearAuthTokens } from "../util/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispacher = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.auth.isOpen);
  const isLoged = useAppSelector((state) => state.auth.isLoged);
  const navigate = useNavigate();

  function handleOpenMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function handleOpenLoginForm() {
    dispacher(authSliceActions.toggleFormOn());
    handleCloseMenu();
  }

  function handleLogOut() {
    clearAuthTokens();
    handleCloseMenu();
    navigate("/");
    dispacher(authSliceActions.toggleIsLoggedOf());
  }

  return (
    <div className="header">
      <div
        onClick={handleOpenMenu}
        className={isOpen ? "menu-btn open" : "menu-btn"}
      >
        <span className="menu-btn__burger"></span>
      </div>
      <div className={isOpen ? "nav open" : "nav"}>
        <img src={logo} alt="" />
        <div className={isOpen ? "actions open" : "actions"}>
          <Button onClick={handleCloseMenu} size="large" variant="text">
            <NavLink to="/">Home</NavLink>
          </Button>
          {isLoged && (
            <Button onClick={handleCloseMenu} size="large" variant="text">
              <NavLink to="/profile">My Profile</NavLink>
            </Button>
          )}
        </div>
        {!isLoged ? (
          <Button
            className="sign-btn"
            onClick={handleOpenLoginForm}
            sx={{ color: "#17252A" }}
            size="medium"
            variant="contained"
          >
            Sign In
          </Button>
        ) : (
          <Button
            className="sign-btn"
            onClick={handleLogOut}
            sx={{ color: "#17252A" }}
            size="medium"
            variant="text"
          >
            Log Out
          </Button>
        )}
      </div>
      {modalIsOpen && <LoginModal />}
    </div>
  );
}
