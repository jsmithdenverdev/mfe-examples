import { LoaderFunction } from "react-router-dom";

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

export type Rocket = {
  name: string;
  id: string;
  description: string;
};
