import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import AppLayout from "./layouts/AppLayout";
import FeedPage from "./pages/FeedPage";
import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import TagsPage from "./pages/TagsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: "boards", element: <BoardsPage /> },
      { path: "tags", element: <TagsPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/boards/:boardId", element: <BoardPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);