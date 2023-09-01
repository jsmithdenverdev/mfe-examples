// @ts-nocheck
import { shared } from "../../vite.federation.shared";

export const resolveRemote = (
  remoteScope: string,
  remoteModuleName: string
) => {
  const remotesMap = {
    remote_profile: {
      url: "http://localhost:3001/assets/remoteEntry.js",
      format: "esm",
    },
  };

  const loadJS = (url, fn) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = fn;
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const scriptTypes = ["var"];
  const importTypes = ["esm", "systemjs"];
  const metaGet = (name) => __federation_import(name);
  const webpackGet = (name) =>
    metaGet(name).then((module) => () => module?.default ?? module);

  // Dynamically construct shareScope
  const shareScope = Object.keys(shared).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: {
        [shared[cur].requiredVersion]: {
          metaGet: () => metaGet(`./__federation_shared_${cur}.js`),
          get: () => webpackGet(`./__federation_shared_${cur}.js`),
          loaded: 1,
        },
      },
    };
  }, {});
  // const shareScope = {
  //   context: {
  //     "1.0.0": {
  //       metaGet: () => metaGet("./__federation_shared_context.js"),
  //       get: () => webpackGet("./__federation_shared_context.js"),
  //       loaded: 1,
  //     },
  //   },
  // };

  async function __federation_import(name) {
    return __vitePreload(
      () => import(/* @vite-ignore */ name),
      true ? [] : void 0
    );
  }

  var __federation__ = {
    ensure: async (remoteId) => {
      const remote = remotesMap[remoteId];
      if (!remote.inited) {
        if (scriptTypes.includes(remote.format)) {
          // loading js with script tag
          return new Promise((resolve) => {
            const callback = () => {
              if (!remote.inited) {
                remote.lib = window[remoteId];
                remote.lib.init(shareScope);
                remote.inited = true;
              }
              resolve(remote.lib);
            };
            loadJS(remote.url, callback);
          });
        } else if (importTypes.includes(remote.format)) {
          // loading js with import(...)
          return new Promise((resolve) => {
            __vitePreload(
              () => import(/* @vite-ignore */ remote.url),
              true ? [] : void 0
            ).then((lib) => {
              if (!remote.inited) {
                lib.init(shareScope);
                remote.lib = lib;
                remote.lib.init(shareScope);
                remote.inited = true;
              }
              resolve(remote.lib);
            });
          });
        }
      } else {
        return remote.lib;
      }
    },
  };

  remotesMap["remote_profile"] = {
    url: "http://localhost:3001/assets/remoteEntry.js",
    format: "esm",
  };

  return __federation__
    .ensure(remoteScope)
    .then((remote) =>
      remote.get(`./${remoteModuleName}`).then((factory) => factory())
    );
};
