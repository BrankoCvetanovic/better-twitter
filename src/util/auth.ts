import { getDatabase, ref, set, get, child } from "firebase/database";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}
export function getUserId() {
  const userId = localStorage.getItem("userId");
  return userId;
}

export function signUpUser(userId: string, name: string, email: string) {
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
