"use client";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import ClientLogos from "../components/ClientLogos";
import TestimonialsSection from "../components/TestimonialsSection";
import ValueProposition from "../components/ValueProposition";
import ProcessSection from "../components/ProcessSection";
import AboutSection from "../components/AboutSection";
import EditModeToggle from "../components/EditModeToggle";
import AutoSave from "../components/AutoSave";
import ClientOnly from "../components/ClientOnly";
import PersistenceDebug from "../components/PersistenceDebug";

export default function Home() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-gray-100" />}>
      <HeroSection />
      <ClientLogos />
      <TestimonialsSection />
      <ValueProposition />
      <ProcessSection />
      <EditModeToggle />
      <AutoSave />
      <PersistenceDebug />
    </ClientOnly>
  );
}
