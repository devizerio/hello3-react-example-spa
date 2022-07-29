import { createContext, useContext } from "react";
export { useDethAuth } from "./use-deth-auth";

export type UserContextType = {
  token?: string | null;
  user?: string | null;
  logout: () => void;
};

const initialState = {
  token: null,
  user: null,
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

export const useUser = () => useContext(UserContext);
