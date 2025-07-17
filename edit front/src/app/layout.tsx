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
import { LoadingProvider } from "../contexts/LoadingContext";
import { EditProvider } from "../contexts/EditContext";
import EditorLayoutWrapper from "./EditorLayoutWrapper";
import LeftEditorSlider from "../components/LeftEditorSlider";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Loading Provider - manages global loading states */}
        <LoadingProvider>
          {/* Authentication Provider - handles login/logout across the site */}
          <AuthProvider>
            {/* Edit Provider - manages global edit state and section registration */}
            <EditProvider>
              {/* Editor Layout Wrapper - provides editing controls when admin is logged in */}
              <EditorLayoutWrapper>
                {/* Navigation bar - appears on every page */}
                <Navbar />
                {/* Page content - this changes based on which page you're on */}
                {children}
                {/* Footer - appears on every page */}
                <Footer />
                {/* Left Editor Slider - main editing panel */}
                <LeftEditorSlider />
              </EditorLayoutWrapper>
            </EditProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
