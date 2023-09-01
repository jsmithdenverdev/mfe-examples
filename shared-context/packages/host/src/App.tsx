import { NameProvider } from "context";
import { useState } from "react";
// @ts-ignore
import Profile from "remote_profile/Profile";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <NameProvider value={name}>
        <Profile />
      </NameProvider>
    </>
  );
}

export default App;
