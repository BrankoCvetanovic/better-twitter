import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="root">
      <Header />
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
}
