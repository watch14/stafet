/**
 * HOME PAGE - Main Website Landing Page
 * =====================================
 *
 * This is the main page visitors see when they come to your website.
 * It displays all the key sections in order:
 *
 * 1. Hero Section - Main banner with headline and call-to-action
 * 2. Client Logos - Showcase of client/partner logos
 * 3. Testimonials - Customer testimonial quote
 * 4. Value Proposition - Key value statement
 * 5. Process Section - Step-by-step process explanation
 *
 * Each section can be edited when an admin is logged in and edit mode is enabled.
 */

"use client";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import ClientLogos from "../components/ClientLogos";
import TestimonialsSection from "../components/TestimonialsSection";
import ValueProposition from "../components/ValueProposition";
import ProcessSection from "../components/ProcessSection";
import AboutSection from "../components/AboutSection";
import ClientOnly from "../components/ClientOnly";
import PersistenceDebug from "../components/PersistenceDebug";

/**
 * Home Page Component
 * Displays all main website sections in order
 */
export default function Home() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-gray-100" />}>
      <HeroSection /> {/* Main banner/hero area */}
      <ClientLogos /> {/* Client logos showcase */}
      <TestimonialsSection /> {/* Customer testimonials */}
      <ValueProposition /> {/* Key value proposition */}
      <ProcessSection /> {/* Step-by-step process */}
      <PersistenceDebug /> {/* Debug info for development */}
    </ClientOnly>
  );
}
