import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { clearAuthTokens, getUserId } from "../util/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSliceActions } from "../store";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";

export default function RootLayout() {
  const dispach = useAppDispatch();

  const isLoged = useAppSelector((state) => state.auth.isLoged);

  useEffect(() => {
    const uid = getUserId();
    if (!uid) {
      return;
    }

    setTimeout(() => {
      clearAuthTokens();
      dispach(authSliceActions.toggleIsLoggedOf());
    }, 3600000);
  }, []);

  return (
    <div className="root">
      {isLoged && <Header />}
      <Outlet />
    </div>
  );
}

export const loader = async () => {
  const imagesListRef = ref(storage, "images/");
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
};
