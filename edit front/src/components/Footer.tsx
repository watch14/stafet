"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] py-12">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/logo-2.png"
              alt="STAFF Logo"
              width={120}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          {/* Customer Links */}
          <div className="flex-1 max-w-[200px] ml-auto mr-16">
            <h3 className="text-black font-semibold mb-4 text-sm">Customer</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-black font-semibold mb-4 text-sm">Contact</h3>
            <div className="text-sm">
              <div className="text-gray-600 mb-1">Get in touch at</div>
              <a
                href="mailto:hello@staffet.com"
                className="text-black hover:underline transition-colors"
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
