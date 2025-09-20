import { Todo, TodoSuggestion } from '@/models/todo';
import { openaiSuggest } from '@/repo/openai';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  suggestions: TodoSuggestion[];
  isSuggestionsLoading: boolean;
  
  // Todo CRUD operations
  addTodo: (title: string, description?: string, userId?: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  
  // Suggestions
  generateSuggestions: (input: string) => Promise<void>;
  addSuggestionAsTodo: (suggestion: TodoSuggestion, userId: string) => void;
  clearSuggestions: () => void;
  
  // Utility
  getTodosByUser: (userId: string) => Todo[];
  clearTodos: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      isLoading: false,
      suggestions: [],
      isSuggestionsLoading: false,

      addTodo: (title: string, description?: string, userId = 'default') => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          title,
          description,
          completed: false,
          createdAt: undefined,
          updatedAt: undefined,
          userId,
        };
        
        set(state => ({
          todos: [...state.todos, newTodo]
        }));
      },

      updateTodo: (id: string, updates: Partial<Todo>) => {
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: undefined }
              : todo
          )
        }));
      },

      deleteTodo: (id: string) => {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id)
        }));
      },

      toggleTodo: (id: string) => {
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: undefined }
              : todo
          )
        }));
      },

      generateSuggestions: async (input: string) => {
        set({ isSuggestionsLoading: true });
        
        try {
          const response = await openaiSuggest(input);
          
          if (!response.length) {
            throw new Error('Failed to fetch suggestions');
          }
          
          
          set({ 
            suggestions: response,
            isSuggestionsLoading: false 
          });
        } catch (error) {
          set({ 
            suggestions: [],
            isSuggestionsLoading: false 
          });
        }
      },

      addSuggestionAsTodo: (suggestion: TodoSuggestion, userId: string) => {
        const { addTodo } = get();
        addTodo(suggestion.title, suggestion.description, userId);
      },

      clearSuggestions: () => {
        set({ suggestions: [] });
      },

      getTodosByUser: (userId: string) => {
        return get().todos.filter(todo => todo.userId === userId);
      },

      clearTodos: () => {
        set({ todos: [] });
      },
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ 
        todos: state.todos 
      }),
    }
  )
);