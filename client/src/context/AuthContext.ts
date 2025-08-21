//AuthContext.ts

import { createContext } from "react";

interface User {
  id: string;
  role: "user" | "admin";
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

// 👇 Sirf context yaha export hoga
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
