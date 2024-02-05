import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { clearAuthTokens, getUserId } from "../util/auth";
import { useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";

export default function RootLayout() {
  const dispach = useAppDispatch();

  useEffect(() => {
    const uid = getUserId();
    if (!uid) {
      return;
    }

    setTimeout(() => {
      clearAuthTokens();
      dispach(authSliceActions.toggleIsLoggedOf());
    }, 360000);
  }, []);

  return (
    <div className="root">
      <Header />
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
}
