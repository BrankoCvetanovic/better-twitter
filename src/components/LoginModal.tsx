import { useRef } from "react";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./SingIn";

const LoginModal = () => {
  const dispacher = useAppDispatch();
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = useAppSelector((state) => state.auth.isOpen);
  if (isOpen) {
    dialog.current?.showModal();
  } else {
    dialog.current?.close();
  }

  function handleCloseForm() {
    dispacher(authSliceActions.toggleOff());
  }

  return createPortal(
    <dialog onClose={handleCloseForm} className="modal" ref={dialog}>
      <div className="form-container">
        <IconButton onClick={handleCloseForm} aria-label="close">
          <CloseIcon />
        </IconButton>
        <SignIn />
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default LoginModal;
