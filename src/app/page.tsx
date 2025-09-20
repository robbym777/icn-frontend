'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo App
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Organize your tasks with AI-powered suggestions
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Get Started
            </h2>
            <p className="text-gray-600">
              Sign in to access your personal todo dashboard with smart task suggestions.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium inline-block"
            >
              Sign In
            </Link>
            
            <Link
              href="/register"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium inline-block"
            >
              Create Account
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Demo account: test@gmail.com / qwerty123
            </p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <h3 className="font-medium mb-2">Features:</h3>
          <ul className="space-y-1">
            <li>• Add, edit, and delete tasks</li>
            <li>• AI-powered task suggestions</li>
            <li>• Progress tracking</li>
            <li>• Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
