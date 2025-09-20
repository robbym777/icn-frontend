'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Header from '@/components/Header';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Your Todo Dashboard
            </h2>
            <p className="text-gray-600">
              Organize your tasks and boost your productivity with AI-powered suggestions
            </p>
          </div>
          
          <AddTodo />
          <TodoList />
        </div>
      </main>
    </div>
  );
}