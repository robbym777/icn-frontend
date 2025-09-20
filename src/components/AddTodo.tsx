'use client';

import { useState } from 'react';
import { useTodoStore } from '@/stores/todoStore';
import { useAuthStore } from '@/stores/authStore';
import { TodoSuggestion } from '@/models/todo';

interface AddTodoProps {
  onTodoAdded?: () => void;
}

export default function AddTodo({ onTodoAdded }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionInput, setSuggestionInput] = useState('');

  const { 
    addTodo, 
    generateSuggestions, 
    addSuggestionAsTodo, 
    clearSuggestions,
    suggestions, 
    isSuggestionsLoading 
  } = useTodoStore();
  
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title.trim(), description.trim() || undefined, user?.id);
    setTitle('');
    setDescription('');
    onTodoAdded?.();
  };

  const handleGenerateSuggestions = async () => {
    if (!suggestionInput.trim()) return;
    
    await generateSuggestions(suggestionInput.trim());
    setShowSuggestions(true);
  };

  const handleAddSuggestion = (suggestion: TodoSuggestion) => {
    if (!user?.id) return;
    
    addSuggestionAsTodo(suggestion, user.id);
    onTodoAdded?.();
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
    clearSuggestions();
    setSuggestionInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            placeholder="Enter task title..."
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            placeholder="Enter task description..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Add Task
          </button>
          
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex-1 sm:flex-none bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Generate Suggestions
          </button>
        </div>
      </form>

      {/* Task Suggestions Section */}
      {showSuggestions && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-800">Task Suggestions</h3>
            <button
              onClick={handleCloseSuggestions}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={suggestionInput}
              onChange={(e) => setSuggestionInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
              placeholder="What do you want to learn or do? (e.g., 'learn programming')"
            />
            <button
              onClick={handleGenerateSuggestions}
              disabled={isSuggestionsLoading || !suggestionInput.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSuggestionsLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {isSuggestionsLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Generating suggestions...</p>
            </div>
          )}

          {suggestions.length > 0 && !isSuggestionsLoading && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Click on any suggestion to add it as a task:
              </p>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="border border-gray-200 rounded-md p-3 hover:bg-white cursor-pointer transition-colors"
                  onClick={() => handleAddSuggestion(suggestion)}
                >
                  <h4 className="font-medium text-gray-800">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}