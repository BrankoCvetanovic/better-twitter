import { getUserData } from "../util/auth";
import { getUserId } from "../util/auth";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export default function ProfilePage() {
  const uId = getUserId();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(uId!),
    queryKey: ["account", uId],
  });

  return (
    <>
      <h1>Profile Page</h1>
      {isPending && <CircularProgress />}
      {isError && <p>{error.message}</p>}
      {data && <p>{data.username}</p>}
    </>
  );
}
