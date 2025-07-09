const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Editor Configuration endpoints
  async getCurrentConfiguration() {
    return this.request("/editor/configuration");
  }

  async getConfiguration(id: string) {
    return this.request(`/editor/configuration/${id}`);
  }

  async saveCurrentConfiguration(data: any) {
    return this.request("/editor/configuration", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async saveNamedConfiguration(id: string, data: any) {
    return this.request(`/editor/configuration/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getAllConfigurations() {
    return this.request("/editor/configurations");
  }

  async deleteConfiguration(id: string) {
    return this.request(`/editor/configuration/${id}`, {
      method: "DELETE",
    });
  }

  // File Upload endpoints
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    return this.request("/upload/image", {
      method: "POST",
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async deleteImage(filename: string) {
    return this.request(`/upload/image/${filename}`, {
      method: "DELETE",
    });
  }

  async getImages() {
    return this.request("/upload/images");
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }
}

export const apiClient = new ApiClient();
export default apiClient;
