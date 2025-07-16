import { createBrowserRouter } from "react-router-dom";

import Audience from "@/pages/Audience";
import AudienceEntry from "@/pages/AudienceEntry";
import Home from "@/pages/Home";
import Presentation from "@/pages/Presentation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/presentation/:roomId", element: <Presentation /> },
  { path: "/enter/:roomId", element: <AudienceEntry /> },
  { path: "/audience/:roomId", element: <Audience /> },
]);

export default router;
