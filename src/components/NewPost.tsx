import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { newPostSliceActions } from "../store";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import { uploadPost, uploadImage } from "../util/post";
import { getUserId } from "../util/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRevalidator } from "react-router-dom";

export default function () {
  const dialog = useRef<HTMLDialogElement>(null);
  const imgPicker = useRef<HTMLInputElement>(null);
  const postText = useRef<HTMLTextAreaElement>(null);

  const userName = useAppSelector((state) => state.auth.userName);

  const revalidator = useRevalidator();

  const [newImage, setNewImage] = useState<File | null>(null);

  let imageUrl = "";
  if (newImage) {
    imageUrl = URL.createObjectURL(newImage);
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

  const handlePosting = async () => {
    if (!postText.current?.value && !newImage) {
      return;
    }
    const toastId = toast.loading("Please wait...");
    let imageName = "";
    if (newImage) {
      imageName = Date.now().toString();
    }
    const uId = getUserId();
    const isTextError = await uploadPost(
      uId!,
      postText.current?.value!,
      imageName,
      userName
    );
    let isImageError = false;
    if (newImage) {
      isImageError = await uploadImage(newImage, imageName!);
    }
    setTimeout(() => {
      if (isTextError || isImageError) {
        toast.update(toastId, {
          render: "An error ocured",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        return;
      }
      toast.update(toastId, {
        render: "Succsess",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    });
    revalidator.revalidate();
    setTimeout(() => {
      dispacher(newPostSliceActions.toggleFormOff());
      dispacher(newPostSliceActions.updatePostState());
    }, 1000);
  };

  return createPortal(
    <dialog onClose={handleCloseNewPost} className="modal" ref={dialog}>
      <ToastContainer position="top-center" hideProgressBar />
      <div className="new-post-container">
        <div className="close">
          <IconButton onClick={handleCloseNewPost}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="new-post">
          <textarea
            ref={postText}
            className="text"
            placeholder="What's going on?"
            maxLength={140}
          />
          {newImage && (
            <div className="img-container">
              <div className="remove-img">
                <IconButton
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(46, 46, 46, 0.836)",
                    "&:hover": { backgroundColor: "rgba(42, 42, 42, 0.936)" },
                  }}
                  size="small"
                  onClick={handleRemoveImage}
                >
                  <CloseIcon fontSize="small" />
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
                setNewImage(event.target.files![0]);
              }}
              className="inputfile"
            />
            <label htmlFor="file">Add Image</label>
          </div>
          <Button onClick={handlePosting} size="small" variant="contained">
            Post
          </Button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
}
