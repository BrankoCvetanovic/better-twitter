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
  const allPostRef = ref(database, "users/allposts");
  const newAllPostRef = push(allPostRef);
  await set(newAllPostRef, {
    postText,
    imageName,
    userName,
    userId,
    likes: {
      initil: "initil",
    },
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

export async function addLike(postId: string, userId: string) {
  const dbRef = ref(getDatabase());
  const postLikes = await get(child(dbRef, `users/allposts/${postId}/likes`))
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
  if (!postLikes) {
    return;
  }
  if (!postLikes.hasOwnProperty(userId)) {
    postLikes[userId] = userId;
  }
  const database = getDatabase();
  const allPostRef = ref(database, `users/allposts/${postId}/likes`);
  set(allPostRef, postLikes);
}

export async function removeLike(postId: string, userId: string) {
  const dbRef = ref(getDatabase());
  const postLikes = await get(child(dbRef, `users/allposts/${postId}/likes`))
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
  if (!postLikes) {
    return;
  }
  if (postLikes.hasOwnProperty(userId)) {
    postLikes[userId] = null;
  }
  const database = getDatabase();
  const allPostRef = ref(database, `users/allposts/${postId}/likes`);
  set(allPostRef, postLikes);
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
