import { getUserData, getUserPosts } from "../util/post";
import { getUserId } from "../util/auth";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Post from "../components/Post";
import { useRouteLoaderData } from "react-router-dom";

export default function ProfilePage() {
  const postCount = useAppSelector((state) => state.newPost.postsCount);

  const imageData = useRouteLoaderData("root") as string[];

  const uId = getUserId();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(uId!),
    queryKey: ["account", uId],
  });
  const {
    data: datap,
    error: errorP,
    isError: sd,
    isPending: aw,
  } = useQuery({
    queryFn: (userId: any) => getUserPosts(uId!),
    queryKey: ["posts", uId, postCount],
  });

  const posts = [];
  if (datap) {
    for (const key in datap) {
      posts.push(datap[key]);
    }
    posts.reverse();
  }

  return (
    <>
      <h1>Profile Page</h1>
      {isPending && <CircularProgress />}
      {isError && <p>{error.message}</p>}
      {data && <p>{data.username}</p>}
      {posts && imageData?.length! > 0 && (
        <ul>
          {posts.map((post: any) => {
            let imageIndex = -1;
            if (post.imageName !== "") {
              imageIndex = imageData!.findIndex((url) =>
                url.includes(post.imageName)
              );
            }
            return (
              <li key={post.imageName + Math.random()}>
                <Post imageName={imageData![imageIndex]} text={post.postText} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
