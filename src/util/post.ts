import { getDatabase, ref, set, push, get, child } from "firebase/database";
import { ref as refStorage, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadPost(
  userId: string,
  postText: string | null,
  imageName: string | null
) {
  let isTextError = false;
  const database = getDatabase();
  const postListRef = ref(database, "users/posts/" + userId);
  const newPostRef = push(postListRef);
  await set(newPostRef, {
    postText,
    imageName,
  }).catch(() => {
    isTextError = true;
  });
  return isTextError;
}

export async function uploadImage(image: File, imageName: string) {
  const imageRef = refStorage(storage, `/images/${imageName}`);
  let isImageError = false;
  await uploadBytes(imageRef, image).catch(() => {
    isImageError = true;
  });
  return isImageError;
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
export function getUserPosts(userId: string) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/posts/${userId}`))
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
