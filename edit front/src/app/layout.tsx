/**
 * ROOT LAYOUT - Main Website Structure
 * ====================================
 *
 * This is the main layout that wraps every page of your website.
 * It provides:
 * - Global fonts and styling
 * - Authentication system (login/logout)
 * - Editor functionality wrapper
 * - Navigation bar and footer on every page
 * - Meta information (title, description)
 *
 * Every page you visit will use this layout as the foundation.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import EditorLayoutWrapper from "./EditorLayoutWrapper";

// Font configuration for the website
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Website metadata (shows in browser tab and search results)
export const metadata: Metadata = {
  title: "Webflow Editor",
  description: "A Webflow-like visual editor",
};

/**
 * Root Layout Component
 * Wraps all pages with essential providers and layout elements
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // The actual page content goes here
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased `}>
        {/* Authentication Provider - handles login/logout across the site */}
        <AuthProvider>
          {/* Editor Layout Wrapper - provides editing controls when admin is logged in */}
          <EditorLayoutWrapper>
            {/* Navigation bar - appears on every page */}
            <Navbar />
            {/* Page content - this changes based on which page you're on */}
            {children}
            {/* Footer - appears on every page */}
            <Footer />
          </EditorLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
