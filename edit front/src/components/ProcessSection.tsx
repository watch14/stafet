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
      titleBgColor: "bg-pink-200",
    },
    {
      number: "02.",
      title: "WHY",
      subtitle: "Identifying why you haven't reached your potential",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      bgColor: "bg-gray-100",
      textColor: "text-black",
      image: "/images/WHY.png",
      titleBgColor: "bg-pink-200",
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
      titleBgColor: "bg-pink-200",
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
      titleBgColor: "bg-pink-200",
    },
  ];

  return (
    <section className="w-full">
      {processes.map((process, index) => (
        <div key={index} className={`w-full ${process.bgColor}`}>
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              {/* Text Content */}
              <div
                className={`flex items-center justify-start px-8 lg:px-16 py-16 lg:py-20 ${
                  index % 2 === 1 ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <div className="max-w-lg w-full ">
                  <div className="flex items-baseline gap-2 ">
                    <span
                      className={`text-5xl lg:text-[50px] font-medium ${process.textColor} leading-tight`}
                    >
                      {process.number}
                    </span>
                    <span
                      className={`px-3 py-1 lg:text-[50px] lg:text-5xl font-medium ${process.titleBgColor} leading-tight text-black `}
                    >
                      {process.title}
                    </span>
                  </div>
                  <h3
                    className={`text-5xl lg:text-[50px] font-light ${process.textColor} leading-tight max-w-md  mb-[100%]`}
                  >
                    {process.subtitle}
                  </h3>
                  <p
                    className={`text-sm lg:text-base ${process.textColor} leading-relaxed max-w-md opacity-80`}
                  >
                    {process.description}
                  </p>
                </div>
              </div>

              {/* Image Content */}
              <div
                className={`relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden ${
                  index % 2 === 1 ? "order-1 lg:order-1" : "order-1 lg:order-2"
                }`}
              >
                <Image
                  src={process.image}
                  alt={`${process.title} - ${process.subtitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
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
