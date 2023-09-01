import { Suspense, useState } from "react";
import { NameProvider } from "context";
import RemoteModule from "./components/RemoteModule";

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
          <RemoteModule scope="remote_profile" module="Profile" />
        </Suspense>
      </NameProvider>
    </>
  );
}

export default App;
