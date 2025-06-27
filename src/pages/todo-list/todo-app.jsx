import React, { useState, useEffect, useRef, useCallback } from 'react';
import './todo-app.css';
import { TodoItem } from './todo-item';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [isLoaded, setIsLoaded] = useState(false); // Track if data has been loaded
  const inputRef = useRef(null);

  // Загрузить данные из localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing saved todos:', error);
      }
    }
    setIsLoaded(true); // Mark as loaded regardless of whether data exists
  }, []);

  // Записать в localStorage при изменении todos (только после загрузки)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Установить фокус на input при монтировании компонента
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Добавить новое todo
  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');
      inputRef.current.focus();
    }
  }, [inputValue]);

  // Удалить todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Изменить состояние todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // Редактировать todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: newText }
        : todo
    ));
  };

  // Очистить завершенные todo
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Выбрать/снять выбор со всех
  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted
    })));
  };

  // Показать todo согласно фильтру
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Статистика
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-app">
      <h1>📝 To-Do List</h1>
      
      {/* Форма добавления todo */}
      <form onSubmit={addTodo} className="add-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="add-input"
        />
        <button type="submit" className="add-button">
          ➕ Добавить
        </button>
      </form>

      {/* Статистика */}
      {todos.length > 0 && (
        <div className="stats">
          <span>Всего: {todos.length}</span>
          <span>Активных: {activeCount}</span>
          <span>Завершенных: {completedCount}</span>
        </div>
      )}

      {/* Операции */}
      {todos.length > 0 && (
        <div className="actions">
          <button 
            onClick={toggleAll}
            className="toggle-all-btn"
          >
            {todos.every(todo => todo.completed) ? '🔲' : '☑️'} 
            Выбрать все
          </button>
          
          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="clear-completed-btn"
            >
              🗑️ Удалить завершенные
            </button>
          )}
        </div>
      )}

      {/* Кнопки фильтров */}
      <div className="filters">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Все
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Активные
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Завершенные
        </button>
      </div>

      {/* Список todo */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">
            {filter === 'all' 
              ? 'Пока нет задач 🤷‍♂️'
              : filter === 'active'
              ? 'Нет активных задач ✅'
              : 'Нет завершенных задач 📝'
            }
          </p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}