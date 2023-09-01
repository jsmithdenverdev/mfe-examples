import React, { ComponentType } from "react";
import { importRemote } from "@module-federation/utilities";

export default function RemoteModule({
  scope,
  url,
  module,
}: {
  scope: string;
  url: string;
  module: string;
}) {
  const Imported = React.lazy(() =>
    importRemote<{ default: ComponentType<any> }>({
      url,
      scope,
      module,
      remoteEntryFileName: "remoteEntry.js",
    })
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Imported />
    </React.Suspense>
  );
}
