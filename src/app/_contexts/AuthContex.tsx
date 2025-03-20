"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { decode } from "jsonwebtoken";
import { loginUser, logoutUser } from "../_services/Auth";

export interface AuthContextType {
  user: unknown;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: unknown = decode(token);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await loginUser({ username, password });

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refresh_token);
      setUser(decode(data.token));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await logoutUser(localStorage.getItem("refreshToken"));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
