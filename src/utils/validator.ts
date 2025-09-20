import { RegisterRequest } from "@/models/auth";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRegisterRequest = (
  request: RegisterRequest
): { valid: boolean; message?: string } => {
  if (!request.name || request.name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long" };
  }

  if (!request.email || !isValidEmail(request.email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }

  if (!request.password || request.password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  return { valid: true };
};
