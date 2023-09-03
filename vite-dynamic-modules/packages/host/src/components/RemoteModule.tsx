import React from "react";
import { resolveRemote } from "../utils/resolve-remote";

function useLazy(name: string, importCall: any) {
  const lazyComponentsStore = React.useRef<{ [name: string]: any }>({}).current;
  if (!lazyComponentsStore[name]) {
    lazyComponentsStore[name] = React.lazy(importCall);
  }
  return lazyComponentsStore[name];
}

const RemoteModule = ({ scope, module }: { scope: string; module: string }) => {
  const Remote = useLazy(`${scope}-${module}`, () =>
    resolveRemote(scope, module)
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Remote />
    </React.Suspense>
  );
};

export default RemoteModule;
