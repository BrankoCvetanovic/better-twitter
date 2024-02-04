import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../asets/logo.png";
import LoginModal from "./LoginModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSliceActions } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    handleCloseMenu();
    navigate("/");
    dispacher(authSliceActions.toggleIsLoggedOf());
  }
  const notify = (type: string) =>
    toast.success(`${type} Succsessful!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleSuccsess(type: string) {
    console.log(type);
    setTimeout(() => {
      notify(type);
    }, 1000);
  }
  return (
    <div className="header">
      <ToastContainer />
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
      {modalIsOpen && <LoginModal onSuccsess={handleSuccsess} />}
    </div>
  );
}
