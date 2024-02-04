import { getUserData } from "../util/auth";
import { getUserId } from "../util/auth";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const uId = getUserId();
  const data1 = getUserData(uId!);
  const { data, error, isError } = useQuery({
    queryFn: (userId: any) => getUserData(uId!),
    queryKey: ["account", uId],
  });

  return (
    <>
      <h1>Profile Page</h1>
      {isError && <p>{error.message}</p>}
      {data && <p>{data.username}</p>}
    </>
  );
}
