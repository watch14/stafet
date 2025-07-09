"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, []);

  const checkAuth = (): boolean => {
    if (typeof window !== "undefined") {
      const localAuth = localStorage.getItem("isAdminAuthenticated");
      const sessionAuth = sessionStorage.getItem("adminSession");
      const isAuth = localAuth === "true" && sessionAuth === "active";
      setIsAuthenticated(isAuth);
      return isAuth;
    }
    return false;
  };

  const login = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdminAuthenticated", "true");
      sessionStorage.setItem("adminSession", "active");
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminAuthenticated");
      sessionStorage.removeItem("adminSession");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
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
