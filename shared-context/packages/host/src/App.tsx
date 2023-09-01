import React, { Suspense, useState } from "react";
import { NameProvider } from "context";
const Profile = React.lazy(() => import("remote_profile/Profile"));

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
          <Profile />
        </Suspense>
      </NameProvider>
    </>
  );
}

export default App;
