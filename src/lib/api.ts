export interface ApiResponse<T> {
  statusCode?: number;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await fetch(url, options);

      const data = await response.json();

      return data;
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...this.headers,
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...this.headers,
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  }

  async postPublic<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: this.headers,
    });
  }

  async getPublic<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers: this.headers,
    });
  }
}

export const apiClient = new ApiClient();
