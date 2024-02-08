import { FC } from "react";

const Post: FC<{ text: string; imageName: string | undefined }> = ({
  text,
  imageName,
}) => {
  return (
    <div className="post">
      <p> {text}</p>
      {imageName && <img src={imageName} alt="" />}
    </div>
  );
};

export default Post;
