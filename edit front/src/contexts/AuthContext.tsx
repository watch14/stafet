/**
 * SECURE AUTHENTICATION CONTEXT - Admin Login System
 * ==================================================
 *
 * This manages a secure admin authentication system for the website editor.
 * Features:
 *
 * - JWT token-based authentication
 * - Backend password verification
 * - Session timeout and validation
 * - Secure credential validation
 * - Automatic logout on token expiration
 *
 * SECURITY MEASURES:
 * - Tokens are JWT with server-side validation
 * - Session validation with backend checks
 * - Automatic expiration (30 minutes)
 * - Secure password hashing on backend
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { apiClient } from "../lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  requireAuth: () => void;
  adminInfo: { id: string; email: string } | null;
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Wraps the entire app to provide auth state management
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<{ id: string; email: string } | null>(null);

  /**
   * Secure Logout Function
   * Comprehensive cleanup with security measures
   */
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      // Clear all authentication data
      localStorage.removeItem("auth_token");
      
      // Clear auth state
      setIsAuthenticated(false);
      setAdminInfo(null);
      setIsLoading(false);
    }
  }, []);

  /**
   * Enhanced Authentication Check
   * Validates JWT tokens with backend verification
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (typeof window !== "undefined") {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("auth_token");
        
        if (!token) {
          setIsAuthenticated(false);
          setAdminInfo(null);
          setIsLoading(false);
          return false;
        }

        // Verify token with backend
        const response = await apiClient.verifyToken();
        
        if (response.success && response.admin) {
          setIsAuthenticated(true);
          setAdminInfo({
            id: response.admin.id,
            email: response.admin.email
          });
          setIsLoading(false);
          return true;
        } else {
          // Invalid response - clear auth data
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            setIsAuthenticated(false);
            setAdminInfo(null);
            setIsLoading(false);
          }
          return false;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Any error means logout - clear auth data
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          setIsAuthenticated(false);
          setAdminInfo(null);
          setIsLoading(false);
        }
        return false;
      }
    }
    setIsLoading(false);
    return false;
  }, []); // Remove logout dependency

  // Check authentication status when app loads
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      if (mounted) {
        await checkAuth();
      }
    };
    
    initAuth();
    
    // Set up periodic token validation (every 5 minutes)
    const interval = setInterval(async () => {
      if (mounted) {
        const isValid = await checkAuth();
        if (!isValid && mounted) {
          logout();
        }
      }
    }, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []); // No dependencies to prevent loops

  /**
   * Secure Admin Login Function
   * Uses backend authentication with JWT tokens
   */
  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    if (typeof window !== "undefined") {
      try {
        const response = await apiClient.login(credentials);
        
        if (response.success && response.token && response.admin) {
          // Store JWT token
          localStorage.setItem("auth_token", response.token);
          
          // Update auth state
          setIsAuthenticated(true);
          setAdminInfo({
            id: response.admin.id,
            email: response.admin.email
          });
          
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    }
    return false;
  };

  /**
   * Require Authentication Function
   * Enhanced with security checks
   */
  const requireAuth = () => {
    if (!isAuthenticated && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      window.location.href = `/admin/login?redirect=${encodeURIComponent(
        currentPath
      )}`;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, checkAuth, requireAuth, adminInfo }}
    >
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
