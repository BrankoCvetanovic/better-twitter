import { getDatabase, ref, set, push, get, child } from "firebase/database";
import {
  ref as refStorage,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

export async function uploadPost(
  userId: string,
  postText: string | null,
  imageName: string | null,
  userName: string
) {
  let isTextError = false;
  const database = getDatabase();
  const postListRef = ref(database, "users/posts/" + userId);
  const newPostRef = push(postListRef);
  const allPostRef = ref(database, "users/allposts");
  const newAllPostRef = push(allPostRef);
  await set(newPostRef, {
    postText,
    imageName,
    userName,
    userId,
  }).catch(() => {
    isTextError = true;
  });
  await set(newAllPostRef, {
    postText,
    imageName,
    userName,
    userId,
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

export function getAllPosts() {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, "users/allposts/"))
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

export async function getPictures() {
  const imagesListRef = refStorage(storage, "images/");
  const urlList: string[] = [];
  return listAll(imagesListRef)
    .then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          urlList.push(url);
        });
      });

      return urlList;
    })
    .catch((error) => {
      return error;
    });
}
