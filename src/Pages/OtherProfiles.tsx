import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserData } from "../util/auth";
import { getUserPosts } from "../util/post";
import Post from "../components/Post";

export default function OtherProfiles() {
  const params = useParams();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(params.userId!),
    queryKey: ["account", params.userId],
  });

  const {
    data: postsData,
    error: errorP,
    isError: sd,
    isPending: aw,
  } = useQuery({
    queryFn: (userId: any) => getUserPosts(params.userId!),
    queryKey: ["posts", params.userId],
  });

  const posts = [];
  if (postsData) {
    for (const key in postsData) {
      posts.push(postsData[key]);
    }
    posts.reverse();
  }

  return (
    <div>
      {data && <div> {data.username} </div>}
      {posts && (
        <ul className="post-container">
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
