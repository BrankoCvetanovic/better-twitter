import { FC, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Post: FC<{
  text: string;
  imageName: string;
  userName: string;
  userId: string;
}> = ({ text, imageName, userName, userId }) => {
  const [imageData, setImageData] = useState<string[]>([]);

  const loaderData = useRouteLoaderData("root") as string[];

  useEffect(() => {
    setImageData(loaderData);
  }, []);

  let imageIndex = -1;
  if (imageName !== "") {
    imageIndex = imageData!.findIndex((url: string) => url.includes(imageName));
  }
  let isError = false;
  if (imageName !== "" && imageIndex === -1) {
    isError = true;
  }

  return (
    <div className="post">
      <NavLink className={"title"} to={`/profiles/${userId}`}>
        {userName}
      </NavLink>
      <div className="text"> {text}</div>
      {isError && <p>An error occurred while fetching images.</p>}
      {imageName && <img src={imageData[imageIndex]} alt="" />}
    </div>
  );
};

export default Post;
