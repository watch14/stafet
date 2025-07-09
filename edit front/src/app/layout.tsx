import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import EditorLayoutWrapper from "./EditorLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webflow Editor",
  description: "A Webflow-like visual editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <EditorLayoutWrapper>
            <Navbar />
            {children}
            <Footer />
          </EditorLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
