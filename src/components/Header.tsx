import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import logo from "../asets/logo.png";
import NewPost from "./NewPost";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSliceActions, newPostSliceActions } from "../store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "react-toastify/dist/ReactToastify.css";
import { clearAuthTokens } from "../util/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispacher = useAppDispatch();
  const newPostIsOpen = useAppSelector((state) => state.newPost.isOpen);
  const navigate = useNavigate();

  function handleOpenMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function handleLogOut() {
    clearAuthTokens();
    handleCloseMenu();
    navigate("/");
    dispacher(authSliceActions.toggleIsLoggedOf());
  }

  function handleOpenNewPost() {
    dispacher(newPostSliceActions.toggleFormOn());
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
            <NavLink to="/home">Home</NavLink>
          </Button>

          <IconButton
            onClick={() => {
              handleCloseMenu();
              handleOpenNewPost();
            }}
            sx={{ color: "#17252A" }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>

          <Button onClick={handleCloseMenu} size="large" variant="text">
            <NavLink to="/profile">My Profile</NavLink>
          </Button>
        </div>

        <Button
          className="sign-btn"
          onClick={handleLogOut}
          sx={{ color: "#17252A" }}
          size="medium"
          variant="text"
        >
          Log Out
        </Button>
      </div>
      {newPostIsOpen && <NewPost />}
    </div>
  );
}
