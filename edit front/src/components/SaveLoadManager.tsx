"use client";

import { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import apiClient from "../lib/api";

interface SavedConfiguration {
  id: string;
  name: string;
  lastModified: string;
  hero: {
    title: string;
    subtitle: string;
  };
  navbar: {
    logo: string;
  };
}

interface SaveLoadManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SaveLoadManager({
  isOpen,
  onClose,
}: SaveLoadManagerProps) {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>([]);
  const [saveName, setSaveName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { hero, navbar, setHero, setNavbar, resetToDefaults } =
    useEditorStore();

  useEffect(() => {
    if (isOpen) {
      setMessage("");
      loadConfigurations();
    }
  }, [isOpen]);

  const loadConfigurations = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getAllConfigurations();
      // Sort by lastModified date, latest first
      const sortedConfigs = (response.configurations || []).sort(
        (a: SavedConfiguration, b: SavedConfiguration) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      );
      setSavedConfigs(sortedConfigs);
    } catch (error) {
      console.error("Failed to load configurations:", error);
      setMessage("Failed to load configurations");
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfiguration = async () => {
    if (!saveName.trim()) {
      setMessage("Please enter a name for this configuration");
      return;
    }

    try {
      setIsLoading(true);
      const configData = {
        name: saveName,
        hero,
        navbar,
      };

      const configId = saveName.toLowerCase().replace(/\s+/g, "-");
      await apiClient.saveNamedConfiguration(configId, configData);

      setMessage("Configuration saved successfully!");
      setSaveName("");
      await loadConfigurations();
    } catch (error) {
      console.error("Failed to save configuration:", error);
      setMessage("Failed to save configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = async (config: SavedConfiguration) => {
    try {
      setIsLoading(true);
      const response = await apiClient.getConfiguration(config.id);

      if (response.configuration) {
        setHero(response.configuration.hero);
        setNavbar(response.configuration.navbar);
        setMessage(`Loaded "${config.name}" successfully!`);
        onClose();
      }
    } catch (error) {
      console.error("Failed to load configuration:", error);
      setMessage("Failed to load configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConfiguration = async (config: SavedConfiguration) => {
    if (!confirm(`Are you sure you want to delete "${config.name}"?`)) {
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.deleteConfiguration(config.id);
      setMessage(`Deleted "${config.name}" successfully!`);
      await loadConfigurations();
    } catch (error) {
      console.error("Failed to delete configuration:", error);
      setMessage("Failed to delete configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const resetToOriginal = () => {
    if (
      !confirm(
        "Are you sure you want to reset to the original configuration? This will discard all current changes."
      )
    ) {
      return;
    }

    try {
      resetToDefaults();
      setMessage("Reset to original configuration successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to reset configuration:", error);
      setMessage("Failed to reset configuration");
    }
  };

  const handleOpen = () => {
    setMessage("");
    loadConfigurations();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto text-black shadow-2xl">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-black">
            Save / Load
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded mb-4 ${
              message.includes("Failed")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Save Section */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
            Save Current Configuration
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter configuration name..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              onClick={saveConfiguration}
              disabled={isLoading || !saveName.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium whitespace-nowrap transition-colors"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Reset Section */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
            Reset Configuration
          </h3>
          <button
            onClick={resetToOriginal}
            disabled={isLoading}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium transition-colors w-full sm:w-auto"
          >
            Reset to Original
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This will restore the default hero and navbar settings
          </p>
        </div>

        {/* Load Section */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-black">
            Saved Configurations
          </h3>

          {isLoading && savedConfigs.length === 0 ? (
            <div className="text-center py-6 text-black text-sm">
              Loading...
            </div>
          ) : savedConfigs.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              No saved configurations found
            </div>
          ) : (
            <div className="space-y-3">
              {savedConfigs.map((config) => (
                <div
                  key={config.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-black text-sm sm:text-base truncate">
                        {config.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        Hero: {config.hero.title.substring(0, 30)}...
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Logo: {config.navbar.logo}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(config.lastModified).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:ml-4 sm:flex-col lg:flex-row">
                      <button
                        onClick={() => loadConfiguration(config)}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium flex-1 sm:flex-initial"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteConfiguration(config)}
                        disabled={isLoading}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-700 disabled:opacity-50 transition-colors font-medium flex-1 sm:flex-initial"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
