import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../store/hooks";
import { newPostSliceActions } from "../store";
import Textarea from "@mui/joy/Textarea";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

export default function () {
  const dialog = useRef<HTMLDialogElement>(null);
  const imgPicker = useRef<HTMLInputElement>(null);

  const [newImage, setNewImage] = useState<File | null>();

  let imageUrl = "";
  console.log(newImage);
  if (newImage) {
    imageUrl = URL.createObjectURL(newImage);
    console.log(imageUrl);
  }

  const dispacher = useAppDispatch();

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function handleCloseNewPost() {
    dispacher(newPostSliceActions.toggleFormOff());
  }

  function handleRemoveImage() {
    setNewImage(null);
    imgPicker.current!.value = "";
  }

  return createPortal(
    <dialog onClose={handleCloseNewPost} className="modal" ref={dialog}>
      <div className="newPost">
        <div className="close">
          <IconButton onClick={handleCloseNewPost}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="post">
          <textarea className="text" placeholder="What's going on?" />
          {newImage && (
            <div className="img-container">
              <div className="remove-img">
                <IconButton size="small" onClick={handleRemoveImage}>
                  <CloseIcon />
                </IconButton>
              </div>
              <img src={imageUrl}></img>
            </div>
          )}
        </div>
        <div className="actions">
          <div className="image-btn">
            <input
              ref={imgPicker}
              type="file"
              name="file"
              id="file"
              onChange={(event) => {
                console.log("s");
                setNewImage(event.target.files![0]);
              }}
              className="inputfile"
            />
            <label htmlFor="file">Add Image</label>
          </div>
          <Button size="small" variant="contained">
            Post
          </Button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
}
