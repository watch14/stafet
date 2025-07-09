"use client";

import { useState, useRef } from "react";
import apiClient from "../lib/api";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

export default function ImageUploader({
  onImageSelect,
  currentImage,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ filename: string; url: string }>
  >([]);
  const [showGallery, setShowGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    try {
      const response = await apiClient.getImages();
      setUploadedImages(response.images || []);
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const response = await apiClient.uploadImage(file);

      if (response.success) {
        const imageUrl = `http://localhost:3001${response.url}`;
        onImageSelect(imageUrl);
        await loadImages(); // Refresh the gallery
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    const fullUrl = `http://localhost:3001${imageUrl}`;
    onImageSelect(fullUrl);
    setShowGallery(false);
  };

  const handleDeleteImage = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await apiClient.deleteImage(filename);
      await loadImages(); // Refresh the gallery
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  const openGallery = () => {
    setShowGallery(true);
    loadImages();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload New"}
        </button>

        <button
          onClick={openGallery}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
        >
          Gallery
        </button>

        {currentImage && (
          <button
            onClick={() => onImageSelect("")}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {currentImage && (
        <div className="mt-2">
          <img
            src={currentImage}
            alt="Current background"
            className="w-full h-32 object-cover rounded border"
          />
        </div>
      )}

      {/* Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Image Gallery</h3>
              <button
                onClick={() => setShowGallery(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {uploadedImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No images uploaded yet
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((image) => (
                  <div key={image.filename} className="relative group">
                    <img
                      src={`http://localhost:3001${image.url}`}
                      alt={image.filename}
                      className="w-full h-32 object-cover rounded border cursor-pointer hover:opacity-75"
                      onClick={() => handleImageSelect(image.url)}
                    />
                    <button
                      onClick={() => handleDeleteImage(image.filename)}
                      className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                      {image.filename}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
