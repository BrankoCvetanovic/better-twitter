import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/Home";
import ProfilePage from "./Pages/Profile";
import ErrorPage from "./Pages/Error";
import OtherProfiles from "./Pages/OtherProfiles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { checkAuthLoader } from "./util/auth";
import { loader } from "./Pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: loader,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/profile", loader: checkAuthLoader, element: <ProfilePage /> },
      { path: "/profiles/:userId", element: <OtherProfiles /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
