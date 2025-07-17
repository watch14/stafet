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
import { useLoadingContext } from "../../contexts/LoadingContext";
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
  const { showLoading, hideLoading } = useLoadingContext();

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

  // Submission state
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading screen with message
    showLoading("Sending your message...");
    setSubmitMessage("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setSubmitMessage(
          "Thank you for your message! We've sent you a confirmation email and will be in touch shortly."
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(
          result.error ||
            "There was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage(
        "There was an error sending your message. Please check your internet connection and try again."
      );
      console.error("Contact form error:", error);
    } finally {
      // Hide loading screen
      hideLoading();
    }
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
        {/* Edit Mode Indicator */}
        {canEdit && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Click to edit
          </div>
        )}

        {/* Left Side - Contact Form */}
        <div
          className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-24"
          onClick={(e) => canEdit && e.stopPropagation()}
        >
          <div className="max-w-lg mx-auto lg:mx-0 w-full">
            {/* Header */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-4 sm:mb-6 leading-tight"
              style={{ color: contact?.titleColor || "#000000" }}
            >
              {contact?.title || "Want to work with us?"}
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 leading-relaxed"
              style={{ color: contact?.textColor || "#000000" }}
            >
              {contact?.subtitle ||
                "Every good collaboration starts with a meaningful conversation. Answer these questions to start our dialogue and we will be in touch shortly."}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: contact?.buttonBgColor || "#FFCEE5",
                  color: contact?.buttonTextColor || "#000000",
                }}
              >
                Submit
              </button>

              {/* Success/Error Message */}
              {submitMessage && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    submitSuccess
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {submitSuccess ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-screen">
          <div className="absolute inset-0">
            {contact?.image && contact.image.trim() !== "" ? (
              <Image
                src={contact.image}
                alt="Contact us"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="font-medium">Contact Image</p>
                  <p className="text-sm">Upload an image to display here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
