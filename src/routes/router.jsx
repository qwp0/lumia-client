import { createBrowserRouter } from "react-router-dom";

import Audience from "@/pages/Audience";
import Home from "@/pages/Home";
import Presentation from "@/pages/Presentation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/presentation/:roomId", element: <Presentation /> },
  { path: "/audience/:roomId", element: <Audience /> },
]);

export default router;
