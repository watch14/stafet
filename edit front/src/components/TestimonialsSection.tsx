"use client";
import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
          What our clients say
        </h2>
        <div className="bg-gray-50 rounded-lg p-6 md:p-8">
          <blockquote className="text-lg md:text-xl text-black leading-relaxed mb-4">
            "Great products start by asking the right business, customers, and
            objectives. From there, we create a strategy rooted in smart design
            and technology."
          </blockquote>
          <cite className="text-sm text-gray-600 font-medium">
            Marcus, SR. Developer
          </cite>
        </div>
      </div>
    </section>
  );
}
