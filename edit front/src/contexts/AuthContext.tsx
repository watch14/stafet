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
  login: (credentials?: { username: string; password: string }) => boolean; // Function to log in as admin with credentials
  logout: () => void; // Function to log out
  checkAuth: () => boolean; // Function to check current auth status
  requireAuth: () => void; // Function to redirect to login if not authenticated
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
   * Validates credentials and sets authentication flags
   */
  const login = (credentials?: { username: string; password: string }): boolean => {
    if (typeof window !== "undefined") {
      // If no credentials provided, use legacy login (for backward compatibility)
      if (!credentials) {
        localStorage.setItem("isAdminAuthenticated", "true");
        sessionStorage.setItem("adminSession", "active");
        setIsAuthenticated(true);
        return true;
      }

      // Validate credentials
      const validUsername = "admin";
      const validPassword = "admin123"; // In production, hash this and store securely
      
      if (credentials.username === validUsername && credentials.password === validPassword) {
        // Generate session token (simple example - use JWT in production)
        const sessionToken = btoa(`${Date.now()}-${Math.random()}`);
        
        localStorage.setItem("isAdminAuthenticated", "true");
        sessionStorage.setItem("adminSession", "active");
        sessionStorage.setItem("sessionToken", sessionToken);
        
        setIsAuthenticated(true);
        return true;
      } else {
        return false; // Invalid credentials
      }
    }
    return false;
  };

  /**
   * Require Authentication Function
   * Redirects to login page if not authenticated
   */
  const requireAuth = () => {
    if (!isAuthenticated && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      window.location.href = `/admin/login?redirect=${encodeURIComponent(currentPath)}`;
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
      sessionStorage.removeItem("sessionToken");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth, requireAuth }}>
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
