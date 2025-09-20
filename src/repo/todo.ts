import { apiClient } from "@/lib/api";
import { Todo } from "@/models/todo";

export const getTodos = async (userId?: string): Promise<Todo[]> => {
  try {
    const endpoint = userId ? `/todos?userId=${userId}` : "/todos";
    const response = await apiClient.get<Todo[]>(endpoint);

    return response.data || [];
  } catch (error) {
    throw new Error("Invalid response from server. Please try again.");
  }
};

export const createTodo = async (
  todo: Omit<Todo, "id" | "createdAt" | "updatedAt">
): Promise<boolean> => {
  try {
    const response = await apiClient.post<Todo>("/todos", todo);

    return response.statusCode === 200;
  } catch (error) {
    throw new Error("Invalid response from server. Please try again.");
  }
};

export const updateTodo = async (
  id: string,
  updates: Partial<Todo>
): Promise<boolean> => {
  try {
    const response = await apiClient.put<Todo>(`/todos/${id}`, updates);

    return response.statusCode === 200;
  } catch (error) {
    throw new Error("Invalid response from server. Please try again.");
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const response = await apiClient.delete<void>(`/todos/${id}`);

    return response.statusCode === 200;
  } catch (error) {
    throw new Error("Invalid response from server. Please try again.");
  }
};