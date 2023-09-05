import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <ul style={{ listStyle: "none", display: "flex" }}>
        <li style={{ margin: 10, marginLeft: 0 }}>
          <Link to="">Home</Link>
        </li>
        <li style={{ margin: 10, marginRight: 0 }}>
          <Link to="/rockets">Rocket list</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
