'use client';

import { useState } from 'react';
import { useTodos } from '@/contexts/TodoContext';
import Button from '@/components/ui/Button';

export default function AddTodo() {
  const [title, setTitle] = useState(`This todo was created at ${new Date().toLocaleString()}`);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addTodo, error } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    try {
      setIsSubmitting(true);
      await addTodo(title.trim(), description.trim() || undefined);
      setTitle(`This todo was created at ${new Date().toLocaleString()}`);
      setDescription('');
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      // Error is handled by the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`p-6 rounded-xl border transition-all duration-300 ${
        showSuccess ? 'animate-pulse' : ''
      }`}
      style={{ 
        backgroundColor: showSuccess ? 'var(--primary)' : 'var(--card)', 
        borderColor: showSuccess ? 'var(--primary)' : 'var(--border)',
        color: showSuccess ? 'var(--primary-foreground)' : 'var(--card-foreground)',
        transform: showSuccess ? 'scale(1.02)' : 'scale(1)',
        boxShadow: showSuccess ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <h2 
        className="text-xl font-semibold mb-4"
        style={{ color: showSuccess ? 'var(--primary-foreground)' : 'var(--foreground)' }}
      >
        {showSuccess ? '✅ Todo Added Successfully!' : 'Add New Todo'}
      </h2>
      
      {error && (
        <div 
          className="mb-4 p-3 rounded-lg text-sm"
          style={{ 
            backgroundColor: 'var(--destructive)', 
            color: 'var(--destructive-foreground)' 
          }}
        >
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="title"
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            className="w-full px-3 py-2 rounded-lg border text-sm focus-ring"
            style={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="description"
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--foreground)' }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description (optional)..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg border text-sm focus-ring resize-none"
            style={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          disabled={!title.trim() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
    </div>
  );
}
