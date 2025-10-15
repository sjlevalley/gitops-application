import { useEffect, useState } from 'react';
import { Todo } from '@/contexts/TodoContext';

export function useNewTodoAnimation(todos: Todo[]) {
  const [newTodoIds, setNewTodoIds] = useState<Set<number>>(new Set());
  const [previousTodos, setPreviousTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Find newly added todos by comparing with previous state
    const newIds = new Set<number>();
    
    if (previousTodos.length > 0) {
      todos.forEach(todo => {
        const wasPresent = previousTodos.some(prevTodo => prevTodo.id === todo.id);
        if (!wasPresent) {
          newIds.add(todo.id);
        }
      });
    }

    if (newIds.size > 0) {
      setNewTodoIds(newIds);
      
      // Remove the highlight after animation completes
      const timer = setTimeout(() => {
        setNewTodoIds(new Set());
      }, 2000); // 2 seconds highlight duration

      return () => clearTimeout(timer);
    }

    setPreviousTodos(todos);
  }, [todos, previousTodos]);

  return newTodoIds;
}
