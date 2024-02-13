import { useAppSelector } from "../store/hooks";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import { getAllPosts } from "../util/post";
import { CircularProgress } from "@mui/material";

export default function HomePage() {
  const postCount = useAppSelector((state) => state.newPost.postsCount);
  const isLoged = useAppSelector((state) => state.auth.isLoged);

  const { data, error, isError, isPending } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["allPosts", postCount],
  });

  const posts = [];
  if (data) {
    for (const key in data) {
      posts.push(data[key]);
    }
    posts.reverse();
  }

  return (
    <div className="home">
      <h1 className="deepshadow">what's new ?!</h1>
      {isError && <p>{error.message}</p>}
      {isLoged && (
        <ul className="post-container">
          {isPending && (
            <li className="pending">
              <CircularProgress size="4rem" />
            </li>
          )}
          {posts.map((post: any) => {
            return (
              <li key={post.imageName + Math.random()}>
                <Post
                  imageName={post.imageName}
                  text={post.postText}
                  userName={post.userName}
                  userId={post.userId}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
