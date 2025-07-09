"use client";
import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto  px-8">
        <div className="w-[32%]">
          <h2 className="text-4xl md:text-4xl font-medium text-black pb-8 leading-none">
            What our clients say
          </h2>
          <div className="max-w-3xl">
            <blockquote className="text-xl md:text-xl text-black mb-6 leading-6">
              “Our process starts by diving into your business, customers, and
              objectives. From there, we create a strategy rooted in our
              findings”
            </blockquote>
            <cite className="text-sm font-regular text-black not-italic">
              - Marcus, 29, HeadHunter
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
