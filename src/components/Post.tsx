import { FC, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getUserId } from "../util/auth";
import { addLike, removeLike } from "../util/post";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post: FC<{
  text: string;
  imageName: string;
  userName: string;
  authId: string;
  postId: string;
  likes: {
    [key: string]: string;
  };
}> = ({ text, imageName, userName, authId, postId, likes }) => {
  const [imageData, setImageData] = useState<string[]>([]);

  const [likesCount, setLikeCount] = useState(Object.keys(likes).length - 1);

  const [isLiked, setIsLiked] = useState(false);

  const loaderData = useRouteLoaderData("root") as string[];

  useEffect(() => {
    setImageData(loaderData);
    if (likes.hasOwnProperty(currentUserId!)) {
      setIsLiked(true);
    }
  }, []);

  let imageIndex = -1;
  if (imageName !== "") {
    imageIndex = imageData!.findIndex((url: string) => url.includes(imageName));
  }
  let isError = false;
  if (imageName !== "" && imageIndex === -1) {
    isError = true;
  }

  const currentUserId = getUserId();

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

  return (
    <div className="post">
      <NavLink className={"title"} to={`/profiles/${authId}`}>
        {userName}
      </NavLink>
      <div className="text"> {text}</div>
      {isError && <p>An error occurred while fetching images.</p>}
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
      </div>
    </div>
  );
};

export default Post;
