'use client'
import React, { createContext, useContext, ReactNode } from "react";
import { authHook } from "@/hooks/useAuth";
import { userHook } from "@/hooks/useUser";

const AuthContext = createContext<ReturnType<typeof authHook> | undefined>(undefined);
const UserContext = createContext<ReturnType<typeof userHook> | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = authHook();
  const user = userHook(auth);

  return (
    <AuthContext.Provider value={auth}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
