import { Suspense, useState } from "react";
import { NameProvider } from "context";
// @ts-ignore
// const Profile = React.lazy(() => import("remote_profile/Profile"));
import RemoteProfile from "./components/RemoteModule";

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
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Profile /> */}
          <RemoteProfile />
        </Suspense>
      </NameProvider>
    </>
  );
}

export default App;
