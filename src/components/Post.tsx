import { FC, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getUserId, getUserName } from "../util/auth";
import {
  addLike,
  deleteImage,
  deletePost,
  removeLike,
  uploadPost,
} from "../util/post";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { newPostSliceActions } from "../store";
import DeleteModul from "./DeleteModal";

const Post: FC<{
  text: string;
  imageName: string;
  userName: string;
  authId: string;
  postId: string;
  myProfile: boolean;
  likes: {
    [key: string]: string;
  };
  isRetweet: boolean;
}> = ({
  text,
  imageName,
  userName,
  authId,
  postId,
  likes,
  myProfile,
  isRetweet,
}) => {
  const [imageData, setImageData] = useState<string[]>([]);
  const [likesCount, setLikeCount] = useState(Object.keys(likes).length - 1);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const loaderData = useRouteLoaderData("root") as string[];

  const dispach = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setImageData(loaderData);
    }, 100);

    if (likes.hasOwnProperty(currentUserId!)) {
      setIsLiked(true);
    }
  }, []);

  let imageIndex = -1;
  if (imageName !== "") {
    imageIndex = imageData!.findIndex((url: string) => url.includes(imageName));
  }

  const currentUserId = getUserId();
  const currentUsername = getUserName();

  function handleLike() {
    addLike(postId, currentUserId!);
    setLikeCount((prev) => prev + 1);
    setIsLiked(true);
  }

  function handleDislike() {
    removeLike(postId, currentUserId!);
    setLikeCount((prev) => prev - 1);
    setIsLiked(false);
  }

  async function handleRetweet() {
    const retweetText = `#${userName}: ${text}`;

    const toastId = toast.loading("Please wait...");
    const isTextError = await uploadPost(
      currentUserId!,
      retweetText,
      imageName,
      currentUsername!,
      true
    );
    if (isTextError) {
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
    setTimeout(() => {
      dispach(newPostSliceActions.updatePostState());
    }, 1000);
  }

  function handleStartDeletion() {
    setIsDeleteOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteOpen(false);
  }

  function handleDelete() {
    deletePost(postId);
    if (!isRetweet) {
      deleteImage(imageName);
    }

    setTimeout(() => {
      dispach(newPostSliceActions.updatePostState());
    }, 1000);
  }

  return (
    <div className="post">
      {isRetweet && <div className="retweet">Retweet</div>}
      <ToastContainer position="top-center" hideProgressBar />
      <div className="top-actions">
        <NavLink className={"title"} to={`/profiles/${authId}`}>
          {userName}
        </NavLink>
        {myProfile && (
          <IconButton onClick={handleStartDeletion}>
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <div className="text"> {text}</div>
      {imageName && <img src={imageData[imageIndex]} alt="" />}
      <div className="actions">
        <div className="like">
          <IconButton
            sx={isLiked ? { color: "red" } : {}}
            onClick={!isLiked ? handleLike : handleDislike}
          >
            {!isLiked && <FavoriteBorderIcon />}
            {isLiked && <FavoriteIcon />}
          </IconButton>
          <div>{likesCount}</div>
        </div>
        <IconButton
          disabled={userName === currentUsername!}
          onClick={handleRetweet}
        >
          <IosShareIcon />
        </IconButton>
      </div>
      {isDeleteOpen && (
        <DeleteModul
          handleClose={handleCloseDeleteModal}
          handleRemove={handleDelete}
        />
      )}
    </div>
  );
};

export default Post;
