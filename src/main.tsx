import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/home";
import GithubViewer from "./pages/github-viewer";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:username",
    element: <GithubViewer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
