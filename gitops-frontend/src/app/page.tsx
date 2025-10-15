'use client';

import AddTodo from '@/components/todo/AddTodo';
import TodoList from '@/components/todo/TodoList';

export default function Home() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            GitOps TODO App
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            A modern TODO application built with Next.js, Express, and deployed using GitOps principles
          </p>
        </div>

        {/* Main Content - Side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Todo Form */}
          <div className="order-2 lg:order-1">
            <AddTodo />
          </div>

          {/* Todo List */}
          <div className="order-1 lg:order-2">
            <TodoList />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div 
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--foreground)' }}
              >
                GitOps TODO App
              </span>
            </div>
            <div 
              className="text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Built with Next.js, Express, and Kubernetes
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
