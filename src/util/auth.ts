import { getDatabase, ref, set } from "firebase/database";
import { redirect } from "react-router-dom";

export function getUserId() {
  const userId = localStorage.getItem("userId");
  return userId;
}

export function checkAuthLoader() {
  const userId = getUserId();

  if (!userId) {
    return redirect("/");
  } else {
    return null;
  }
}
export function clearAuthTokens() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

export function addUserToDatabase(userId: string, name: string, email: string) {
  const database = getDatabase();
  set(ref(database, "users/accounts/" + userId), {
    username: name,
    email: email,
  });
}
