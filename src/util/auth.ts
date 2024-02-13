import { getDatabase, ref, set, get, child } from "firebase/database";
import { redirect } from "react-router-dom";

export function getUserId() {
  const userId = localStorage.getItem("userId");
  return userId;
}

export function getUserName() {
  return localStorage.getItem("username");
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
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
}

export function addUserToDatabase(userId: string, name: string, email: string) {
  const database = getDatabase();
  set(ref(database, "users/accounts/" + userId), {
    username: name,
    email: email,
  });
}
export function getUserData(userId: string) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/accounts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("Could not find users data.");
      }
    })
    .catch((error) => {
      throw new Error("Could not find users data.");
    });
}
