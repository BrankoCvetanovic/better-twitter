import { createPortal } from "react-dom";
import { useEffect, useRef, FC } from "react";
import { Button } from "@mui/material";

const DeleteModal: FC<{
  handleClose: () => void;
  handleRemove: () => void;
}> = ({ handleClose, handleRemove }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return createPortal(
    <dialog className="delete-modal" onClose={handleClose} ref={dialog}>
      <div className="text">Are you sure you want to delete this post?</div>
      <div className="actions">
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleRemove} variant="contained" color="error">
          Delete
        </Button>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};
export default DeleteModal;
