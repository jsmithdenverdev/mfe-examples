import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-ignore
import remoteRoutes from "remote_app/Routes";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/rockets", children: remoteRoutes }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
