import Speech from "./pages/Speech";
import MyArchive from "./pages/MyArchive";

const routes = [
  { path: "/", element: <Speech /> },
  { path: "my-archive", element: <MyArchive /> },
];

export default routes;
