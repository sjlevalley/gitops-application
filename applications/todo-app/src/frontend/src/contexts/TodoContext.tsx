'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  fetchTodos: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/todos`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description?: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.statusText}`);
      }

      const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      console.error('Error adding todo:', err);
      throw err;
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.statusText}`);
      }

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`);
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
