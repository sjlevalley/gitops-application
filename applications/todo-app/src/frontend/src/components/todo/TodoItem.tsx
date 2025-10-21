'use client';

import { useState } from 'react';
import { Todo, useTodos } from '@/contexts/TodoContext';
import Button from '@/components/ui/Button';
import { useNewTodoAnimation } from '@/hooks/useNewTodoAnimation';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateTodo, deleteTodo, toggleTodo, todos } = useTodos();
  const newTodoIds = useNewTodoAnimation(todos);
  
  const isNewTodo = newTodoIds.has(todo.id);

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    try {
      setIsUpdating(true);
      await updateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating todo:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(todo.id);
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-500 ${
        todo.completed ? 'opacity-75' : ''
      } ${
        isNewTodo ? 'animate-pulse shadow-lg' : 'animate-in slide-in-from-top-2 fade-in'
      }`}
      style={{ 
        backgroundColor: isNewTodo ? 'var(--primary)' : 'var(--card)', 
        borderColor: isNewTodo ? 'var(--primary)' : 'var(--border)',
        color: isNewTodo ? 'var(--primary-foreground)' : 'var(--card-foreground)',
        animationDelay: '0ms',
        animationDuration: isNewTodo ? '2000ms' : '300ms',
        animationFillMode: 'both',
        transform: isNewTodo ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isNewTodo ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm focus-ring"
            style={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
            placeholder="Todo title..."
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm focus-ring resize-none"
            style={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
            placeholder="Todo description..."
            rows={2}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              variant="primary"
              size="sm"
              disabled={!editTitle.trim() || isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <button
              onClick={handleToggle}
              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                todo.completed 
                  ? 'bg-primary border-primary' 
                  : 'border-border hover:border-primary'
              }`}
              style={{ 
                backgroundColor: todo.completed ? 'var(--primary)' : 'transparent',
                borderColor: todo.completed ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {todo.completed && (
                <svg 
                  className="w-3 h-3" 
                  style={{ color: 'var(--primary-foreground)' }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 
                className={`text-lg font-medium ${
                  todo.completed ? 'line-through' : ''
                }`}
                style={{ color: 'var(--foreground)' }}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p 
                  className={`text-sm mt-1 ${
                    todo.completed ? 'line-through' : ''
                  }`}
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {todo.description}
                </p>
              )}
              <p 
                className="text-xs mt-2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Created: {formatDate(todo.created_at)}
                {todo.updated_at !== todo.created_at && (
                  <span> • Updated: {formatDate(todo.updated_at)}</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              size="sm"
              style={{ 
                backgroundColor: 'var(--destructive)', 
                color: 'var(--destructive-foreground)',
                borderColor: 'var(--destructive)'
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
