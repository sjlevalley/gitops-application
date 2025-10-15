'use client';

import { useTodos } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, loading, error } = useTodos();

  if (loading) {
    return (
      <div 
        className="p-6 rounded-xl border animate-in fade-in duration-300"
        style={{ 
          backgroundColor: 'var(--card)', 
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)'
        }}
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
          <span 
            className="ml-3 text-sm animate-pulse"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Loading todos...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="p-6 rounded-xl border animate-in fade-in duration-300"
        style={{ 
          backgroundColor: 'var(--card)', 
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)'
        }}
      >
        <div 
          className="p-4 rounded-lg text-center animate-in slide-in-from-top-2 duration-300"
          style={{ 
            backgroundColor: 'var(--destructive)', 
            color: 'var(--destructive-foreground)' 
          }}
        >
          <h3 className="font-semibold mb-2">Error Loading Todos</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div 
        className="p-6 rounded-xl border animate-in fade-in duration-500"
        style={{ 
          backgroundColor: 'var(--card)', 
          borderColor: 'var(--border)',
          color: 'var(--card-foreground)'
        }}
      >
        <div className="text-center py-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center animate-in zoom-in duration-500"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <svg 
              className="w-8 h-8 animate-pulse" 
              style={{ color: 'var(--muted-foreground)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
          </div>
          <h3 
            className="text-lg font-semibold mb-2 animate-in slide-in-from-bottom-2 duration-300"
            style={{ color: 'var(--foreground)' }}
          >
            No todos yet
          </h3>
          <p 
            className="text-sm animate-in slide-in-from-bottom-2 duration-300"
            style={{ 
              color: 'var(--muted-foreground)',
              animationDelay: '100ms'
            }}
          >
            Add your first todo above to get started!
          </p>
        </div>
      </div>
    );
  }

  // Sort todos by creation date (most recent first)
  const sortedTodos = [...todos].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const completedTodos = sortedTodos.filter(todo => todo.completed);
  const pendingTodos = sortedTodos.filter(todo => !todo.completed);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats */}
      <div 
        className="p-4 rounded-lg border animate-in slide-in-from-left-2 duration-300"
        style={{ 
          backgroundColor: 'var(--muted)', 
          borderColor: 'var(--border)'
        }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {todos.length}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Total
            </div>
          </div>
          <div>
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {pendingTodos.length}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Pending
            </div>
          </div>
          <div>
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {completedTodos.length}
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* Pending Todos */}
      {pendingTodos.length > 0 && (
        <div className="animate-in slide-in-from-right-2 duration-400">
          <h2 
            className="text-lg font-semibold mb-4 animate-in fade-in duration-300"
            style={{ color: 'var(--foreground)' }}
          >
            Pending ({pendingTodos.length})
          </h2>
          <div className="space-y-3">
            {pendingTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="animate-in slide-in-from-top-2 fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '300ms',
                  animationFillMode: 'both'
                }}
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="animate-in slide-in-from-left-2 duration-400">
          <h2 
            className="text-lg font-semibold mb-4 animate-in fade-in duration-300"
            style={{ color: 'var(--foreground)' }}
          >
            Completed ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="animate-in slide-in-from-top-2 fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '300ms',
                  animationFillMode: 'both'
                }}
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
