import { useEffect, useRef, useState } from "react";

// Отдельный компонент Todo Item
export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  // Установить фокус на input при переходе в режим редактирования
  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="edit-input"
        />
      ) : (
        <span 
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
          title="Дважды кликните для редактирования"
        >
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-btn"
          title="Редактировать"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
          title="Удалить"
        >
          🗑️
        </button>
      </div>
      
      <small className="todo-date">{todo.createdAt}</small>
    </div>
  );
}
