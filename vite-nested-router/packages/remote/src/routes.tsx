import { type RouteObject } from "react-router-dom";
import Root from "./pages/Root";
// import RocketList, { loader as rocketListLoader } from "./pages/RocketList";
// import RocketDetails, { loader as rocketDetailsLoader } from "./pages/RocketDetails";

const routes: RouteObject[] = [
  {
    element: <Root />,
    children: [
      // {
      //   path: "",
      //   element: <RocketList />,
      //   loader: rocketListLoader,
      // },
      {
        path: "",
        async lazy() {
          const { default: Component, loader } = await import(
            "./pages/RocketList"
          );
          return {
            Component,
            loader,
          };
        },
      },
      // {
      //   path: ":id",
      //   element: <RocketDetails />,
      //   loader: rocketDetailsLoader,
      // },
      {
        path: ":id",
        async lazy() {
          const { default: Component, loader } = await import(
            "./pages/RocketDetails"
          );

          return { Component, loader };
        },
      },
    ],
  },
];

export default routes;
