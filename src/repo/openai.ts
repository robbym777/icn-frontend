import { apiClient } from "@/lib/api";
import { TodoSuggestion } from "@/models/todo";

export const openaiSuggest = async (suggest: string): Promise<TodoSuggestion[]> => {
  try {
    const response = await apiClient.post<TodoSuggestion[]>("/openai/suggest", {
      prompt: suggest,
    });

    return response.data || [];
  } catch (error) {
    throw new Error("openaiSuggest failed. Please try again.");
  }
};
