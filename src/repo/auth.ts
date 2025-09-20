import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/models/auth";
import { validateRegisterRequest } from "@/utils/validator";
import { apiClient } from "@/lib/api";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.postPublic<LoginResponse>(
      "/auth/login",
      request
    );

    if (!response.data?.user || !response.data?.token) {
      throw new Error("Invalid response from server. Please try again.");
    }

    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};

export const register = async (
  request: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const validation = validateRegisterRequest(request);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const response = await apiClient.postPublic<RegisterResponse>(
      "/auth/register",
      request
    );

    if (!response.data?.email) {
      throw new Error("Invalid response from server. Please try again.");
    }

    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
