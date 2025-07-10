/**
 * AUTHENTICATION CONTEXT - Admin Login System
 * ============================================
 *
 * This manages the admin authentication system for the website editor.
 * It handles:
 *
 * - Admin login/logout functionality
 * - Authentication state management
 * - Session persistence across browser tabs
 * - Automatic logout when browser closes
 *
 * SECURITY NOTE:
 * This is a simple frontend-only authentication for demo purposes.
 * In production, you would want:
 * - Backend authentication with JWT tokens
 * - Password protection
 * - User roles and permissions
 * - Secure token storage
 *
 * The current system uses browser storage to remember login state
 * but doesn't provide real security protection.
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean; // Whether user is logged in as admin
  login: () => void; // Function to log in as admin
  logout: () => void; // Function to log out
  checkAuth: () => boolean; // Function to check current auth status
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Wraps the entire app to provide auth state management
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when app loads
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check Authentication Status
   * Verifies both localStorage and sessionStorage for security
   */
  const checkAuth = (): boolean => {
    if (typeof window !== "undefined") {
      const localAuth = localStorage.getItem("isAdminAuthenticated");
      const sessionAuth = sessionStorage.getItem("adminSession");
      // Require both storage methods to be set for authentication
      const isAuth = localAuth === "true" && sessionAuth === "active";
      setIsAuthenticated(isAuth);
      return isAuth;
    }
    return false;
  };

  /**
   * Admin Login Function
   * Sets authentication flags in browser storage
   */
  const login = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdminAuthenticated", "true"); // Persists across sessions
      sessionStorage.setItem("adminSession", "active"); // Clears when browser closes
      setIsAuthenticated(true);
    }
  };

  /**
   * Admin Logout Function
   * Clears all authentication data
   */
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
