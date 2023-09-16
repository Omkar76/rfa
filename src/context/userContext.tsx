import React, { createContext, useContext, useState } from "react";
import { User } from "../types/users";

export interface IUserContext {
  setUser: (user: User) => void;
  user: User;
}

export const UserContext = createContext<IUserContext>(null!);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUserContext must be within user provider");
  }

  return context;
};
