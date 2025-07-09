"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FFFFFB] pt-24 pb-8">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="">
            <Image
              src="/images/logo-2.png"
              alt="STAFF Logo"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          {/* Customer Links */}
          <div className="max-w-[200px]  mr-16">
            <h3 className="text-black font-bold mb-4 text-sm">Customer</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-black hover:underline  ">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:underline ">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:underline  ">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:underline  ">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-black font-bold mb-4 text-sm">Contact</h3>
            <div className="text-sm">
              <div className="text-black mb-0">Get in touch at</div>
              <a
                href="mailto:hello@staffet.com"
                className="text-black underline "
              >
                hello@staffet.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
