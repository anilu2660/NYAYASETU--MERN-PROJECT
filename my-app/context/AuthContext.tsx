"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

type User = { id: string; name: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      setUser({ id: data._id || data.id, name: data.name, email: data.email });
    } catch {
      setUser(null);
    }
  };

  // Load user on first mount if token exists
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setLoading(false);
      return;
    }
    (async () => {
      await refreshProfile();
      setLoading(false);
    })();
  }, []);

  const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    // your backend may return just msg; if it returns token, handle same as login
    await api.post("/auth/signup", { name, email, password });
    // after signup, log in directly:
    await login({ email, password });
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", { email, password });
    // expecting { token, user }
    if (data?.token) localStorage.setItem("token", data.token);
    if (data?.user) setUser(data.user);
    else await refreshProfile(); // fallback if server doesn't return user in login
    router.push("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // inside AuthContext.tsx


  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, refreshProfile, }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
