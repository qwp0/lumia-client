import { createBrowserRouter } from "react-router-dom";

import AudienceView from "@/pages/audienceView";
import Home from "@/pages/Home";
import Presentation from "@/pages/Presentation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/presentation/:roomId", element: <Presentation /> },
  { path: "/audience/:roomId", element: <AudienceView /> },
]);

export default router;
