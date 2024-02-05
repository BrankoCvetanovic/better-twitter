import { useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./SingIn";

export default function LoginModal() {
  const dispacher = useAppDispatch();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function handleCloseForm() {
    dispacher(authSliceActions.toggleFormOff());
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
}
