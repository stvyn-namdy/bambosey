// client/src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type User = { username: string } | null;
interface AuthContextType {
  user: User;
  loading: boolean;
  login: (u: string, p: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // on mount, fetch current user
  useEffect(() => {
    axios.get("/api/auth/user").then((res) => {
      setUser(res.data.user);
      setLoading(false);
    });
  }, []);

  async function login(username: string, password: string, remember: boolean) {
    await axios.post("/api/auth/login", { username, password, remember });
    const res = await axios.get("/api/auth/user");
    setUser(res.data.user);
  }

  async function logout() {
    await axios.post("/api/auth/logout");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
