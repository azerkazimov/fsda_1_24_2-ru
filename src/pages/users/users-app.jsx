import { User, Plus, Loader, AlertCircle, Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./user-app.css";


export default function UsersApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  // API functions
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(`Ошибка загрузки пользователей: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newUser = await response.json();
      setUsers((prevUsers) => [{ ...newUser, id: Date.now() }, ...prevUsers]);
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError(`Ошибка создания пользователя: ${err.message}`);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setError(null);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData, id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...userData, ...updatedUser, id } : user
        )
      );
      setEditingUser(null);
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError(`Ошибка обновления пользователя: ${err.message}`);
    }
  };

  const deleteUser = async (id) => {
    try {
      setError(null);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError(`Ошибка удаления пользователя: ${err.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      setError("Имя и email обязательны для заполнения");
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      createUser(formData);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setShowForm(false);
    resetForm();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="app-container">
        <div className="app-wrapper">
          <div className="main-card">
            {/* Header */}
            <div className="user-header">
              <div className="header-left">
                <div className="icon-wrapper">
                  <User className="header-icon" size={28} />
                </div>
                <h1 className="title">Управление пользователями</h1>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className={`add-button ${showForm ? 'active' : ''}`}
              >
                <Plus size={20} />
                <span>Добавить пользователя</span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="error-alert">
                <AlertCircle size={20} />
                <span className="error-text">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="close-button"
                >
                  ×
                </button>
              </div>
            )}
            {/* Form */}
            {showForm && (
              <div className="form-card">
                <h2 className="form-title">
                  {editingUser ? "Редактировать пользователя" : "Новый пользователь"}
                </h2>
                <div className="form-grid">
                  <div className="input-group">
                    <label className="label">Имя *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input"
                      placeholder="Введите имя"
                    />
                  </div>

                  <div className="input-group">
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input"
                      placeholder="Введите email"
                    />
                  </div>

                  <div className="input-group">
                    <label className="label">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="input"
                      placeholder="Введите телефон"
                    />
                  </div>

                  <div className="input-group">
                    <label className="label">Веб-сайт</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="input"
                      placeholder="Введите URL веб-сайта"
                    />
                  </div>

                  <div className="button-group">
                    <button
                      onClick={handleSubmit}
                      className="submit-button"
                    >
                      {editingUser ? "Обновить" : "Создать"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="cancel-button"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="loading-container">
                <Loader className="spinner" size={32} />
                <span className="loading-text">Загрузка пользователей...</span>
              </div>
            )}

            {/* Users List */}
            {!loading && users.length > 0 && (
              <div className="users-section">
                <h2 className="section-title">
                  Пользователи ({users.length})
                </h2>
                <div className="users-grid">
                  {users.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-content">
                        <div className="user-info">
                          <h3 className="user-name">{user.name}</h3>
                          <div className="user-detail">
                            <strong>Email:</strong> {user.email}
                          </div>
                          {user.phone && (
                            <div className="user-detail">
                              <strong>Телефон:</strong> {user.phone}
                            </div>
                          )}
                          {user.website && (
                            <div className="user-detail">
                              <strong>Сайт:</strong>
                              <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="website-link"
                              >
                                {user.website}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="user-actions">
                          <button
                            onClick={() => startEdit(user)}
                            className="action-button edit-button"
                            title="Редактировать"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Вы уверены, что хотите удалить этого пользователя?"
                                )
                              ) {
                                deleteUser(user.id);
                              }
                            }}
                            className="action-button delete-button"
                            title="Удалить"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && users.length === 0 && !error && (
              <div className="empty-state">
                <User size={64} className="empty-icon" />
                <p className="empty-text">Пользователи не найдены</p>
                <button
                  onClick={fetchUsers}
                  className="refresh-button"
                >
                  Обновить
                </button>
              </div>
            )}

            {/* API Info */}
            <div className="api-info">
              <h3 className="api-title">Информация о JSONPlaceholder API</h3>
              <p className="api-description">
                Это демонстрационное приложение использует JSONPlaceholder API для
                симуляции CRUD операций. Фактические данные на сервере не
                изменяются, но все HTTP запросы выполняются корректно.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}