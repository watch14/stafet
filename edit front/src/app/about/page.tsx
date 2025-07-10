"use client";
import AboutSection from "../../components/AboutSection";
import ClientOnly from "../../components/ClientOnly";

export default function AboutPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-gray-100" />}>
      <AboutSection />
    </ClientOnly>
  );
}
