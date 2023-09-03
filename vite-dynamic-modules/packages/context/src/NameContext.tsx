import { createContext, useContext } from "react";

const NameContext = createContext<string>("Unset");

export default NameContext.Provider;

export const useName = () => useContext(NameContext);
