"use client";
import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-12">
          What our clients say
        </h2>
        <div className="max-w-3xl">
          <blockquote className="text-lg md:text-xl text-black leading-relaxed mb-6">
            "Our process starts by diving into your business, customers, and
            objectives. From there, we create a strategy rooted in our findings"
          </blockquote>
          <cite className="text-base text-black font-medium not-italic">
            - Marcus, Sr. Developer
          </cite>
        </div>
      </div>
    </section>
  );
}
