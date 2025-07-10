``` js
// App.js - Updated with dynamic routing
import Main from "./pages/main/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersApp from "./pages/users/users-app";
import UserDetail from "./pages/users/user-detail"; // New component

import About from "./pages/about/about";
import TodoApp from "./pages/todo-list/todo-app";
import { AuthLayout, MainLayout } from "./layout/layout";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* main routes with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<UsersApp />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/about" element={<About user="Mussolini" />} />
            <Route path="/todo-list" element={<TodoApp />} />
          </Route>

          {/* Auth routes without Navbar */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

// ========================================
// pages/users/user-detail.js - New component
// ========================================
import { User, ArrowLeft, Mail, Phone, Globe, MapPin, Building, AlertCircle, Loader } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./user-detail.css";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(`Ошибка загрузки пользователя: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="user-detail-container">
        <div className="loading-container">
          <Loader className="spinner" size={32} />
          <span className="loading-text">Загрузка пользователя...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-detail-container">
        <div className="error-container">
          <AlertCircle size={48} className="error-icon" />
          <h2>Ошибка</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/users')} className="back-button">
            <ArrowLeft size={20} />
            Назад к пользователям
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail-container">
        <div className="error-container">
          <User size={48} className="error-icon" />
          <h2>Пользователь не найден</h2>
          <button onClick={() => navigate('/users')} className="back-button">
            <ArrowLeft size={20} />
            Назад к пользователям
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-wrapper">
        <div className="user-detail-card">
          {/* Header */}
          <div className="user-detail-header">
            <button onClick={() => navigate('/users')} className="back-button">
              <ArrowLeft size={20} />
              Назад к пользователям
            </button>
            <h1 className="user-detail-title">Профиль пользователя</h1>
          </div>

          {/* User Info */}
          <div className="user-profile">
            <div className="user-avatar">
              <User size={64} />
            </div>
            <div className="user-main-info">
              <h2 className="user-full-name">{user.name}</h2>
              <p className="user-username">@{user.username}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="info-section">
            <h3 className="section-title">Контактная информация</h3>
            <div className="info-grid">
              <div className="info-item">
                <Mail size={20} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <a href={`mailto:${user.email}`} className="info-value link">
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <Phone size={20} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Телефон</span>
                  <a href={`tel:${user.phone}`} className="info-value link">
                    {user.phone}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <Globe size={20} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Веб-сайт</span>
                  <a 
                    href={`http://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="info-value link"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="info-section">
            <h3 className="section-title">Адрес</h3>
            <div className="info-grid">
              <div className="info-item">
                <MapPin size={20} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Адрес</span>
                  <span className="info-value">
                    {user.address.street}, {user.address.suite}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <Building size={20} className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Город</span>
                  <span className="info-value">
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="info-section">
            <h3 className="section-title">Компания</h3>
            <div className="company-info">
              <div className="company-header">
                <h4 className="company-name">{user.company.name}</h4>
                <span className="company-bs">{user.company.bs}</span>
              </div>
              <p className="company-phrase">"{user.company.catchPhrase}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// pages/users/users-app.js - Updated with navigation
// ========================================
import { User, Plus, Loader, AlertCircle, Edit2, Trash2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user-app.css";

export default function UsersApp() {
  const navigate = useNavigate();
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

  // ... all your existing API functions remain the same ...

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  // ... all your existing functions remain the same ...

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

            {/* Form - same as before */}
            {/* ... existing form code ... */}

            {/* Loading */}
            {loading && (
              <div className="loading-container">
                <Loader className="spinner" size={32} />
                <span className="loading-text">Загрузка пользователей...</span>
              </div>
            )}

            {/* Users List - Updated with clickable cards */}
            {!loading && users.length > 0 && (
              <div className="users-section">
                <h2 className="section-title">
                  Пользователи ({users.length})
                </h2>
                <div className="users-grid">
                  {users.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-content">
                        <div 
                          className="user-info clickable"
                          onClick={() => handleUserClick(user.id)}
                        >
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
                                onClick={(e) => e.stopPropagation()}
                              >
                                {user.website}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="user-actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
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

// ========================================
// pages/users/user-detail.css - Styles for UserDetail component
// ========================================
.user-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.user-detail-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.user-detail-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-detail-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.user-detail-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
}

.user-profile {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #e6f2ff 100%);
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.user-main-info {
  flex: 1;
}

.user-full-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.user-username {
  font-size: 1.1rem;
  color: #667eea;
  margin: 0;
  font-weight: 500;
}

.info-section {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.info-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.info-icon {
  color: #667eea;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.info-content {
  flex: 1;
}

.info-label {
  display: block;
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
}

.link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.company-info {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.company-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.company-bs {
  font-size: 0.9rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.company-phrase {
  font-style: italic;
  color: #4a5568;
  margin: 0;
  font-size: 1rem;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 2rem;
}

.spinner {
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  color: #667eea;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #4a5568;
  font-size: 1.1rem;
}

.error-container h2 {
  color: #e53e3e;
  margin: 1rem 0;
  font-size: 1.5rem;
}

.error-container p {
  color: #4a5568;
  margin-bottom: 2rem;
}

.error-icon {
  color: #e53e3e;
  margin-bottom: 1rem;
}

/* Updated styles for clickable user cards */
.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable:hover {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.view-button {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.view-button:hover {
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .user-detail-container {
    padding: 1rem;
  }

  .user-profile {
    flex-direction: column;
    text-align: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .company-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .user-detail-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .back-button {
    align-self: flex-start;
  }
}

```