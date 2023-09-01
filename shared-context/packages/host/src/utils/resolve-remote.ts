// @ts-nocheck
import { shared } from "../../vite.federation.config";

export const resolveRemote = (
  remoteScope: string,
  remoteModuleName: string
) => {
  // TODO:
  // Fetch this from an API
  const remotesMap = {
    remote_profile: {
      url: "http://localhost:3001/assets/remoteEntry.js",
      format: "esm",
    },
  };

  // The __vitePreload function is generated at build time, so we need to
  // monkey patch it for dev mode.
  if (import.meta.DEV) {
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

    // TODO:
    // Sharing libraries is going to be incredibly difficult
    // as there is no process bundling libraries during dev
    // mode. This might not be possible in pure dev mode at
    // the moment.
    const shareScope = {
      context: {
        "1.0.0": {
          metaGet: () => null,
          get: () => null,
          loaded: 1,
        },
      },
    };

    const __vitePreload = function preload(baseModule, deps, importerUrl) {
      if (!true || !deps || deps.length === 0) {
        return baseModule();
      }
      const links = document.getElementsByTagName("link");
      return Promise.all(
        deps.map((dep) => {
          dep = assetsURL(dep);
          if (dep in seen) return;
          seen[dep] = true;
          const isCss = dep.endsWith(".css");
          const cssSelector = isCss ? '[rel="stylesheet"]' : "";
          const isBaseRelative = !!importerUrl;
          if (isBaseRelative) {
            for (let i = links.length - 1; i >= 0; i--) {
              const link = links[i];
              if (link.href === dep && (!isCss || link.rel === "stylesheet")) {
                return;
              }
            }
          } else if (
            document.querySelector(`link[href="${dep}"]${cssSelector}`)
          ) {
            return;
          }
          const link = document.createElement("link");
          link.rel = isCss ? "stylesheet" : scriptRel;
          if (!isCss) {
            link.as = "script";
            link.crossOrigin = "";
          }
          link.href = dep;
          document.head.appendChild(link);
          if (isCss) {
            return new Promise((res, rej) => {
              link.addEventListener("load", res);
              link.addEventListener("error", () =>
                rej(new Error(`Unable to preload CSS for ${dep}`))
              );
            });
          }
        })
      )
        .then(() => baseModule())
        .catch((err) => {
          const e = new Event("vite:preloadError", {
            cancelable: true,
          });
          e.payload = err;
          window.dispatchEvent(e);
          if (!e.defaultPrevented) {
            throw err;
          }
        });
    };

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
  } else {
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
  }
};
