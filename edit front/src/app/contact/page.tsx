/**
 * CONTACT PAGE - "Work with us" Contact Form
 * ==========================================
 *
 * This is the contact page that users reach when clicking "Work with us".
 * Features:
 * - Split layout with form on left, image on right
 * - Contact form with name, email, phone, and message fields
 * - Professional styling matching the overall design
 * - Fully responsive design
 * - Editable content when admin is logged in
 */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEditorStore } from "../../store/editorStore";
import { useEditorManager } from "../../hooks/useEditorManager";
import { useAuth } from "../../contexts/AuthContext";
import ContactEditor from "../../components/ContactEditor";

/**
 * Contact Page Component
 * Displays the "Work with us" contact form and information
 */
export default function ContactPage() {
  const contact = useEditorStore((s) => s.contact);
  const setContact = useEditorStore((s) => s.setContact);
  const editMode = useEditorStore((s) => s.editMode);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive, closeEditor } = useEditorManager();

  // Migration: Fix old placeholder image paths
  React.useEffect(() => {
    if (contact?.image && contact.image.includes("/api/placeholder")) {
      setContact({ ...contact, image: "/images/Work.png" });
    }
  }, [contact, setContact]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Only allow edit interactions if user is authenticated
  const canEdit = editMode && isAuthenticated;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the form data (placeholder functionality)
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll be in touch soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto">
      {/* Contact Editor Panel */}
      <ContactEditor open={isEditorActive("contact")} onClose={closeEditor} />

      {/* Main Content - Split layout */}
      <div
        className={`flex flex-col lg:flex-row min-h-screen relative ${
          canEdit ? "cursor-pointer" : ""
        }`}
        style={{
          outline: canEdit ? "2px dashed #2563eb" : undefined,
          backgroundColor: contact?.bgColor || "#ffffff",
        }}
        onClick={() => canEdit && openEditor("contact")}
        tabIndex={canEdit ? 0 : -1}
      >
        {/* Left Side - Contact Form */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-lg mx-auto lg:mx-0 w-full">
            {/* Header */}
            <h1
              className="text-4xl lg:text-5xl font-normal mb-6 leading-tight"
              style={{ color: contact?.titleColor || "#000000" }}
            >
              {contact?.title || "Want to work with us?"}
            </h1>

            <p
              className="text-lg mb-12 leading-relaxed"
              style={{ color: contact?.textColor || "#000000" }}
            >
              {contact?.subtitle ||
                "Every good collaboration starts with a meaningful conversation. Answer these questions to start our dialogue and we will be in touch shortly."}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: contact?.textColor || "#000000" }}
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Your full name"
                />
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contact?.textColor || "#000000" }}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contact?.textColor || "#000000" }}
                  >
                    Cell number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: contact?.textColor || "#000000" }}
                >
                  I need help with:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                  placeholder="Tell us about your project or how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg"
                style={{
                  backgroundColor: contact?.buttonBgColor || "#FFCEE5",
                  color: contact?.buttonTextColor || "#000000",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-screen">
          <div className="absolute inset-0">
            <Image
              src={contact?.image || "/images/Work.png"}
              alt="Contact us"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
