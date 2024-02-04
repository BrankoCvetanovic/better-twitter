import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import HomePage from "./Pages/Home";
import ProfilePage from "./Pages/Profile";
import ErrorPage from "./Pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
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
