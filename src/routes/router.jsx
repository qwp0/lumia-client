import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Presentation from "@/pages/Presentation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/presentation", element: <Presentation /> },
]);

export default router;
