import { getAllPosts } from "../util/post";
import { getUserData } from "../util/auth";
import { getUserId } from "../util/auth";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Post from "../components/Post";

export default function ProfilePage() {
  const postCount = useAppSelector((state) => state.newPost.postsCount);

  const uId = getUserId();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(uId!),
    queryKey: ["account", uId],
  });

  let joiningDate = "";

  if (data) {
    joiningDate = data.date.slice(5, 16);
  }

  const {
    data: postsData,
    error: postsError,
    isError: isPostsError,
    isPending: isPostsPending,
  } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["posts", postCount],
  });

  const posts = [];
  if (postsData) {
    for (const key in postsData) {
      if (postsData[key].userId === uId) {
        posts.push({ data: postsData[key], postId: key });
      }
    }
    posts.reverse();
  }

  return (
    <div className="profile">
      {isPending && <CircularProgress />}
      {isError && <h2>{error.message}</h2>}
      {data && (
        <div className="user">
          <h1>{data.username}</h1> <div>{joiningDate}</div>
        </div>
      )}
      {isPostsPending && (
        <div className="pending">
          <CircularProgress size="4rem" />
        </div>
      )}
      {isPostsError && <p>{postsError.message}</p>}
      {(posts && posts.length === 0) || <div className="posts">POSTS</div>}
      {posts && posts.length === 0 && (
        <div>
          <div>Let us begain!</div>
          <div>Upload your first post today!</div>
        </div>
      )}
      {posts && (
        <ul className="post-container">
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
                  myProfile={true}
                  isRetweet={post.data.isRetweet}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
