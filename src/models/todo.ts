export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
}

export interface TodoSuggestion {
  id: string;
  title: string;
  description: string;
}
