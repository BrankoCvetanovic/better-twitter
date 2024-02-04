import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../asets/logo.png";
import LoginModal from "./LoginModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSliceActions } from "../store";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispacher = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.auth.isOpen);
  const isLoged = useAppSelector((state) => state.auth.isLoged);
  const navigate = useNavigate();

  function HandleOpenMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleOpenLoginForm() {
    dispacher(authSliceActions.toggleFormOn());
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    dispacher(authSliceActions.toggleIsLoggedOf());
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
          {isLoged && (
            <Button size="large" variant="text">
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
