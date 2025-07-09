"use client";
import React from "react";
import Image from "next/image";

export default function ClientLogos() {
  const logos = [
    {
      name: "Express Bank",
      logo: "/images/Express.png", // Express Bank
      alt: "Express Bank Logo",
    },
    {
      name: "TwoPoint",
      logo: "/images/TwoPoint.png", // TwoPoint
      alt: "TwoPoint Logo",
    },
    {
      name: "Gentofte Kommune",
      logo: "/images/HeadHunter.png", // HeadHunter
      alt: "Gentofte Kommune Logo",
    },
    {
      name: "Fundbricks",
      logo: "/images/Gentofte.png", // Gentofte
      alt: "Fundbricks Logo",
    },
    {
      name: "STAFF",
      logo: "/images/Fundbricks.png", // Fundbricks
      alt: "STAFF Logo",
    },
  ];

  return (
    <section className="w-full pt-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {logos.map((client, index) => (
            <div key={index} className="flex items-center justify-center h-12">
              <Image
                src={client.logo}
                alt={client.alt}
                width={120}
                height={48}
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  if (target.nextSibling) {
                    (target.nextSibling as HTMLElement).style.display = "block";
                  }
                }}
              />
              <span className="hidden text-black font-medium text-sm md:text-base">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
