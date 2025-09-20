'use client';

import { useState, useMemo } from 'react';
import { useTodoStore } from '@/stores/todoStore';
import { useAuthStore } from '@/stores/authStore';
import TodoItem from './TodoItem';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoList() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { 
    todos, 
    updateTodo, 
    deleteTodo, 
    toggleTodo,
    getTodosByUser 
  } = useTodoStore();
  
  const { user } = useAuthStore();

  const userTodos = useMemo(() => {
    if (!user?.id) return [];
    return getTodosByUser(user.id);
  }, [user?.id, todos, getTodosByUser]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return userTodos.filter(todo => !todo.completed);
      case 'completed':
        return userTodos.filter(todo => todo.completed);
      default:
        return userTodos;
    }
  }, [userTodos, filter]);

  const stats = useMemo(() => {
    const total = userTodos.length;
    const completed = userTodos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [userTodos]);

  const filterButtons: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to see your todos.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          My Tasks
        </h2>
        
        {/* Stats */}
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Total: {stats.total}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Active: {stats.active}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Done: {stats.completed}
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-1">
              {filter === 'all' && 'No tasks yet'}
              {filter === 'active' && 'No active tasks'}
              {filter === 'completed' && 'No completed tasks'}
            </h3>
            <p className="text-gray-500 text-sm">
              {filter === 'all' && 'Add your first task to get started!'}
              {filter === 'active' && 'All tasks are completed! Great job! 🎉'}
              {filter === 'completed' && 'Complete some tasks to see them here.'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              {stats.completed} of {stats.total} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}