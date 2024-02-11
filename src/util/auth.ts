import { getDatabase, ref, set, get, child } from "firebase/database";
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
export function getUserData(userId: string) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/accounts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("There is no available data at the moment.");
      }
    })
    .catch((error) => {
      throw new Error("There is no available data at the moment.");
    });
}
