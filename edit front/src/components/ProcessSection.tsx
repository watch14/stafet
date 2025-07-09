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
      image: "/images/WHAT.png",
    },
    {
      number: "02.",
      title: "WHY",
      subtitle: "Identifying why you haven't reached your potential",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-gray-200",
      textColor: "text-black",
      image: "/images/WHY.png",
    },
    {
      number: "03.",
      title: "HOW",
      subtitle: "Defining actions to reach your targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-white",
      textColor: "text-black",
      image: "/images/HOW.png",
    },
    {
      number: "04.",
      title: "ACTION",
      subtitle: "Making your vision a reality",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-gray-100",
      textColor: "text-black",
      image: "/images/ACTION.png",
    },
  ];

  return (
    <section className="w-full">
      {processes.map((process, index) => (
        <div key={index} className={`w-full ${process.bgColor}`}>
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Text Content */}
              <div
                className={`flex items-center justify-center px-8 py-16 lg:py-24 ${
                  index % 2 === 1 ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <div className="max-w-lg w-full">
                  <div
                    className={`text-sm font-medium ${process.textColor} mb-3 tracking-wider`}
                  >
                    {process.number} {process.title}
                  </div>
                  <h3
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold ${process.textColor} mb-8 leading-tight`}
                  >
                    {process.subtitle}
                  </h3>
                  <p
                    className={`text-lg md:text-xl ${process.textColor} leading-relaxed`}
                  >
                    {process.description}
                  </p>
                </div>
              </div>

              {/* Image Content */}
              <div
                className={`relative min-h-[400px] lg:min-h-[600px] ${
                  index % 2 === 1 ? "order-1 lg:order-1" : "order-1 lg:order-2"
                }`}
              >
                <Image
                  src={process.image}
                  alt={`${process.title} - ${process.subtitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
