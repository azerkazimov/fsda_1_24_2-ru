
## 1. Связь компонент и форм

### Контролируемые компоненты (Controlled Components)

В React формы обычно реализуются как контролируемые компоненты, где состояние формы управляется React-компонентом.

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлено:', { name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Неконтролируемые компоненты (Uncontrolled Components)

Используют refs для получения значений напрямую из DOM.

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлено:', {
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Имя" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

## 2. Обработка данных формы

### Объединение состояния формы

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Имя"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Возраст"
      />
      <select name="country" value={formData.country} onChange={handleInputChange}>
        <option value="">Выберите страну</option>
        <option value="russia">Россия</option>
        <option value="usa">США</option>
        <option value="germany">Германия</option>
      </select>
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Работа с чекбоксами и радиокнопками

```jsx
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    notifications: true,
    theme: 'light'
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleRadioChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      theme: e.target.value
    }));
  };

  return (
    <form>
      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={preferences.newsletter}
          onChange={handleCheckboxChange}
        />
        Подписаться на рассылку
      </label>
      
      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={preferences.notifications}
          onChange={handleCheckboxChange}
        />
        Включить уведомления
      </label>

      <div>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={preferences.theme === 'light'}
            onChange={handleRadioChange}
          />
          Светлая тема
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={preferences.theme === 'dark'}
            onChange={handleRadioChange}
          />
          Тёмная тема
        </label>
      </div>
    </form>
  );
}
```

## 3. Валидация форм

### Простая валидация на стороне клиента

```jsx
function ValidatedForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Валидация email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email некорректен';
    }

    // Валидация пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    // Валидация подтверждения пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Форма валидна:', formData);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Пароль"
        />
        {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      </div>
      
      <div>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Подтвердите пароль"
        />
        {errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
      </div>
      
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

## 4. Two-way Data Binding

В React two-way binding реализуется через комбинацию `value` и `onChange`:

```jsx
function TwoWayBindingExample() {
  const [text, setText] = useState('');
  const [counter, setCounter] = useState(0);

  return (
    <div>
      {/* Двусторонняя связь для текста */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
      />
      <p>Вы ввели: {text}</p>
      
      {/* Двусторонняя связь для числа */}
      <input
        type="number"
        value={counter}
        onChange={(e) => setCounter(Number(e.target.value))}
      />
      <p>Счётчик: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <button onClick={() => setCounter(counter - 1)}>-1</button>
    </div>
  );
}
```

### Кастомный хук для two-way binding

```jsx
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  return {
    value,
    onChange: (e) => setValue(e.target.value),
    reset: () => setValue(initialValue)
  };
}

function FormWithCustomHook() {
  const name = useFormInput('');
  const email = useFormInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлено:', {
      name: name.value,
      email: email.value
    });
    name.reset();
    email.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...name} placeholder="Имя" />
      <input {...email} type="email" placeholder="Email" />
      <button type="submit">Отправить</button>
    </form>
  );
}
```

## 5. Отображение списков с данными

### Базовое отображение списка

```jsx
function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Анна', email: 'anna@email.com' },
    { id: 2, name: 'Борис', email: 'boris@email.com' },
    { id: 3, name: 'Вера', email: 'vera@email.com' }
  ]);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

### Интерактивный список с возможностью удаления

```jsx
function InteractiveList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Изучить React', completed: false },
    { id: 2, text: 'Написать код', completed: true },
    { id: 3, text: 'Протестировать приложение', completed: false }
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (text) => {
    const newItem = {
      id: Date.now(),
      text,
      completed: false
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <AddItemForm onAdd={addItem} />
      <ul>
        {items.map(item => (
          <li key={item.id} style={{
            textDecoration: item.completed ? 'line-through' : 'none'
          }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
            />
            {item.text}
            <button onClick={() => deleteItem(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddItemForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
```

### Фильтрация и сортировка списков

```jsx
function FilterableList() {
  const [products] = useState([
    { id: 1, name: 'iPhone', category: 'electronics', price: 999 },
    { id: 2, name: 'Футболка', category: 'clothing', price: 29 },
    { id: 3, name: 'Ноутбук', category: 'electronics', price: 1299 },
    { id: 4, name: 'Джинсы', category: 'clothing', price: 79 }
  ]);

  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase()) &&
      (categoryFilter === 'all' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Поиск продуктов..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="electronics">Электроника</option>
          <option value="clothing">Одежда</option>
        </select>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Сортировать по имени</option>
          <option value="price">Сортировать по цене</option>
        </select>
      </div>
      
      <ul>
        {filteredAndSortedProducts.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - 
            {product.category} - 
            ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 6. Использование keys

### Важность правильных ключей

Keys помогают React идентифицировать, какие элементы изменились, добавились или удалились.

```jsx
// ❌ Плохо - использование индекса как ключа
function BadKeyExample() {
  const [items, setItems] = useState(['a', 'b', 'c']);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Проблема при изменении порядка
      ))}
    </ul>
  );
}

// ✅ Хорошо - использование уникального ID
function GoodKeyExample() {
  const [items, setItems] = useState([
    { id: 1, text: 'a' },
    { id: 2, text: 'b' },
    { id: 3, text: 'c' }
  ]);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### Демонстрация проблемы с неправильными ключами

```jsx
function KeyDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'Товар 1', selected: false },
    { id: 2, name: 'Товар 2', selected: false },
    { id: 3, name: 'Товар 3', selected: false }
  ]);

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Товар ${items.length + 1}`,
      selected: false
    };
    setItems([newItem, ...items]);
  };

  return (
    <div>
      <button onClick={shuffleItems}>Перемешать</button>
      <button onClick={addItem}>Добавить товар</button>
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input type="checkbox" defaultChecked={item.selected} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 7. React Hook Form

React Hook Form предоставляет эффективный способ работы с формами с минимальными перерендерами.

### Установка

```bash
npm install react-hook-form
```

### Базовое использование

```jsx
import { useForm } from 'react-hook-form';

function BasicHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName', { required: 'Имя обязательно' })}
        placeholder="Имя"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input
        {...register('email', {
          required: 'Email обязателен',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Неверный формат email'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('age', {
          required: 'Возраст обязателен',
          min: {
            value: 18,
            message: 'Минимальный возраст 18 лет'
          }
        })}
        type="number"
        placeholder="Возраст"
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Отправить</button>
    </form>
  );
}
```

### Продвинутые возможности React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function AdvancedHookForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      newsletter: false
    }
  });

  const watchedEmail = watch('email');

  const onSubmit = async (data) => {
    // Имитация асинхронной отправки
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Отправлено:', data);
    reset(); // Сброс формы после отправки
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('firstName', {
            required: 'Имя обязательно',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
          placeholder="Имя"
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <input
          {...register('lastName', { required: 'Фамилия обязательна' })}
          placeholder="Фамилия"
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <div>
        <input
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Неверный формат email'
            }
          })}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
        {watchedEmail && <p>Ваш email: {watchedEmail}</p>}
      </div>

      <div>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Выберите страну' }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Выберите страну</option>
              <option value="russia">Россия</option>
              <option value="usa">США</option>
              <option value="germany">Германия</option>
            </select>
          )}
        />
        {errors.country && <span>{errors.country.message}</span>}
      </div>

      <div>
        <label>
          <input
            {...register('newsletter')}
            type="checkbox"
          />
          Подписаться на рассылку
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}
```

### Кастомная валидация с React Hook Form

```jsx
function CustomValidationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const validatePasswordStrength = (value) => {
    if (value.length < 8) return 'Минимум 8 символов';
    if (!/(?=.*[a-z])/.test(value)) return 'Нужна строчная буква';
    if (!/(?=.*[A-Z])/.test(value)) return 'Нужна заглавная буква';
    if (!/(?=.*\d)/.test(value)) return 'Нужна цифра';
    return true;
  };

  const onSubmit = (data) => {
    console.log('Валидная форма:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('username', {
            required: 'Имя пользователя обязательно',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа'
            },
            validate: {
              noSpaces: value => 
                !/\s/.test(value) || 'Пробелы не разрешены',
              notAdmin: value =>
                value !== 'admin' || 'Имя "admin" запрещено'
            }
          })}
          placeholder="Имя пользователя"
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <input
          {...register('password', {
            required: 'Пароль обязателен',
            validate: validatePasswordStrength
          })}
          type="password"
          placeholder="Пароль"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <input
          {...register('confirmPassword', {
            required: 'Подтверждение пароля обязательно',
            validate: value =>
              value === password || 'Пароли не совпадают'
          })}
          type="password"
          placeholder="Подтвердите пароль"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

## 8. Практические примеры использования

### Комплексная форма регистрации пользователя

```jsx
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

function UserRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    mode: 'onChange' // Валидация при изменении
  });

  const onSubmit = async (data) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Пользователь зарегистрирован:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <h2>Регистрация успешна!</h2>
        <button onClick={() => setIsSubmitted(false)}>
          Зарегистрировать ещё одного пользователя
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Регистрация пользователя</h2>
      
      <div>
        <label>Имя:</label>
        <input
          {...register('firstName', {
            required: 'Имя обязательно',
            minLength: { value: 2, message: 'Минимум 2 символа' }
          })}
          placeholder="Введите имя"
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <label>Фамилия:</label>
        <input
          {...register('lastName', {
            required: 'Фамилия обязательна',
            minLength: { value: 2, message: 'Минимум 2 символа' }
          })}
          placeholder="Введите фамилию"
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Неверный формат email'
            }
          })}
          type="email"
          placeholder="email@example.com"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Дата рождения:</label>
        <input
          {...register('birthDate', {
            required: 'Дата рождения обязательна',
            validate: {
              notFuture: value => 
                new Date(value) <= new Date() || 'Дата не может быть в будущем',
              adult: value => {
                const today = new Date();
                const birth = new Date(value);
                const age = today.getFullYear() - birth.getFullYear();
                return age >= 18 || 'Должно быть 18+ лет';
              }
            }
          })}
          type="date"
        />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
      </div>

      <div>
        <label>Пол:</label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Выберите пол' }}
          render={({ field }) => (
            <div>
              <label>
                <input {...field} type="radio" value="male" />
                Мужской
              </label>
              <label>
                <input {...field} type="radio" value="female" />
                Женский
              </label>
              <label>
                <input {...field} type="radio" value="other" />
                Другой
              </label>
            </div>
          )}
        />
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div>
        <label>
          <input
            {...register('agreeToTerms', {
              required: 'Необходимо согласие с условиями'
            })}
            type="checkbox"
          />
          Я согласен с условиями использования
        </label>
        {errors.agreeToTerms && <span>{errors.agreeToTerms.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
```
