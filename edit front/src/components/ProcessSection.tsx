"use client";
import React from "react";
import Image from "next/image";

export default function ProcessSection() {
  const processes = [
    {
      number: "01.",
      title: "WHAT",
      subtitle: "Calibrating your business targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-white",
      textColor: "text-black",
      image: "/images/image 1.png",
    },
    {
      number: "02.",
      title: "WHY",
      subtitle: "Identifying why you haven't reached your potential",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-gray-200",
      textColor: "text-black",
      image: "/images/image 2.png",
    },
    {
      number: "03.",
      title: "HOW",
      subtitle: "Defining actions to reach your targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-white",
      textColor: "text-black",
      image: "/images/image 3.png",
    },
    {
      number: "04.",
      title: "ACTION",
      subtitle: "Making your vision a reality",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-gray-100",
      textColor: "text-black",
      image: "/images/image 4.png",
    },
  ];

  return (
    <section className="w-full">
      {processes.map((process, index) => (
        <div key={index} className={`w-full py-16 ${process.bgColor}`}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`${
                  index % 2 === 1 ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <div
                  className={`text-sm font-medium ${process.textColor} mb-2`}
                >
                  {process.number} {process.title}
                </div>
                <h3
                  className={`text-2xl md:text-3xl font-bold ${process.textColor} mb-6 leading-tight`}
                >
                  {process.subtitle}
                </h3>
                <p
                  className={`text-base md:text-lg ${process.textColor} leading-relaxed`}
                >
                  {process.description}
                </p>
              </div>
              <div
                className={`${
                  index % 2 === 1 ? "order-1 lg:order-1" : "order-1 lg:order-2"
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden min-h-[300px] relative">
                  <Image
                    src={process.image}
                    alt={`${process.title} - ${process.subtitle}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to colored background if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Fallback content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {process.number} {process.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
