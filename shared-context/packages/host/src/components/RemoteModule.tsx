import React from "react";
import { resolveRemote } from "../utils/resolve-remote";

const RemoteModule = ({ scope, module }: { scope: string; module: string }) => {
  const Remote = React.lazy(() => resolveRemote(scope, module));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Remote />
    </React.Suspense>
  );
};

export default RemoteModule;
