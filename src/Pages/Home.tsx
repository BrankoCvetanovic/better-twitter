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
    queryKey: ["posts", postCount],
  });

  const posts = [];
  if (data) {
    for (const key in data) {
      posts.push({ data: data[key], postId: key });
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
              <li key={post.data.imageName + Math.random()}>
                <Post
                  imageName={post.data.imageName}
                  text={post.data.postText}
                  userName={post.data.userName}
                  authId={post.data.userId}
                  likes={post.data.likes}
                  postId={post.postId}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
