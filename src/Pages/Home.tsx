import { useAppSelector } from "../store/hooks";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import { getAllPosts } from "../util/post";

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
      <h1>Home Page</h1>
      {isLoged && (
        <ul>
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
