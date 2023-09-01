import { useName } from "context";
export default function Profile() {
  const name = useName();
  return (
    <div>
      <h1>Profile</h1>
      <h2>{name}</h2>
    </div>
  );
}
