## 1. Условное отображение компонент

Условное отображение позволяет показывать или скрывать компоненты в зависимости от определенных условий.

#### Способы условного отображения:

**1. Тернарный оператор**

```javascript
{condition ? <Component /> : null}
{condition ? <ComponentA /> : <ComponentB />}
```

**2. Логический оператор &&**

```javascript
{condition && <Component />}
```

**3. If-else вне JSX**

```javascript
let content;
if (condition) {
  content = <Component />;
} else {
  content = <OtherComponent />;
}
return <div>{content}</div>;
```

**4. Функция-помощник**

```javascript
const renderContent = () => {
  if (condition1) return <Component1 />;
  if (condition2) return <Component2 />;
  return <DefaultComponent />;
};
```

### Практические примеры

```javascript
// Пример 1: Показ/скрытие элемента
function LoginStatus({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Добро пожаловать, {user.name}!</h1>
      ) : (
        <h1>Пожалуйста, войдите в систему</h1>
      )}
    </div>
  );
}

// Пример 2: Условное отображение списка
function UserList({ users, loading, error }) {
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (users.length === 0) return <div>Пользователи не найдены</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 2. Ререндеринг компонент


Ререндеринг происходит когда:

- Изменяется состояние компонента (state)
- Изменяются пропсы (props)
- Родительский компонент ререндерится
- Вызывается forceUpdate() (не рекомендуется)

### Оптимизация ререндеринга

**1. React.memo()**

```javascript
const MemoizedComponent = React.memo(function MyComponent({ name }) {
  return <div>Привет, {name}!</div>;
});
```

**2. useMemo()**

```javascript
const ExpensiveComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  
  return <div>Сумма: {expensiveValue}</div>;
};
```

**3. useCallback()**

```javascript
const Parent = ({ items }) => {
  const handleClick = useCallback((id) => {
    // логика обработки
  }, []);
  
  return (
    <div>
      {items.map(item => (
        <Child key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

**4. Правильная структура состояния**

```javascript
// Плохо
const [state, setState] = useState({
  user: { name: 'John', age: 30 },
  posts: [],
  comments: []
});

// Хорошо
const [user, setUser] = useState({ name: 'John', age: 30 });
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);
```

## 3. Стили

### 3.1 Стилизация компонент

#### Способы стилизации:

**1. Inline стили**

```javascript
const MyComponent = () => {
  const style = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px'
  };
  
  return <div style={style}>Содержимое</div>;
};
```

**2. CSS классы**

```javascript
import './MyComponent.css';

const MyComponent = () => {
  return <div className="my-component">Содержимое</div>;
};
```

**3. CSS Modules**

```javascript
import styles from './MyComponent.module.css';

const MyComponent = () => {
  return <div className={styles.myComponent}>Содержимое</div>;
};
```

**4. Styled Components**

```javascript
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: blue;
  color: white;
  padding: 10px;
`;

const MyComponent = () => {
  return <StyledDiv>Содержимое</StyledDiv>;
};
```

### 3.2 Динамическое добавление стилей

**1. Условные классы**

```javascript
const Button = ({ isActive, isPrimary }) => {
  const className = `btn ${isActive ? 'active' : ''} ${isPrimary ? 'primary' : 'secondary'}`;
  
  return <button className={className}>Кнопка</button>;
};
```

**2. Объект стилей с условиями**

```javascript
const Component = ({ isHighlighted }) => {
  const style = {
    padding: '10px',
    backgroundColor: isHighlighted ? 'yellow' : 'white',
    border: isHighlighted ? '2px solid red' : '1px solid gray'
  };
  
  return <div style={style}>Содержимое</div>;
};
```

**3. Библиотека classnames**

```javascript
import classNames from 'classnames';

const Button = ({ isActive, isPrimary, size }) => {
  const classes = classNames('btn', {
    'btn-active': isActive,
    'btn-primary': isPrimary,
    'btn-secondary': !isPrimary,
    [`btn-${size}`]: size
  });
  
  return <button className={classes}>Кнопка</button>;
};
```

### 3.3 Практические примеры

```javascript
// Пример 1: Динамическая тема
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const themeStyles = {
    light: {
      backgroundColor: '#fff',
      color: '#000'
    },
    dark: {
      backgroundColor: '#000',
      color: '#fff'
    }
  };
  
  return (
    <div style={themeStyles[theme]}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Переключить тему
      </button>
      {children}
    </div>
  );
};

// Пример 2: Анимированный компонент
const AnimatedBox = ({ isVisible }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'blue',
    transition: 'all 0.3s ease',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.5)'
  };
  
  return <div style={style}></div>;
};
```

---

## Практические задания

### Задание 1: Условное отображение

Создайте компонент `UserProfile`, который:

- Показывает форму входа, если пользователь не авторизован
- Показывает профиль пользователя, если авторизован
- Показывает загрузку во время процесса авторизации
- Показывает ошибку при неудачной авторизации

### Задание 2: Список с фильтрацией

Создайте компонент `ProductList`, который:

- Отображает список товаров
- Имеет фильтры по категории и цене
- Показывает "Товары не найдены", если список пустой
- Показывает количество найденных товаров

### Задание 3: Оптимизация ререндеринга

Создайте компонент `OptimizedList`, который:

- Отображает большой список элементов (1000+)
- Использует React.memo для оптимизации
- Имеет кнопки для добавления/удаления элементов
- Показывает счетчик ререндеров

### Задание 4: Динамические стили

Создайте компонент `InteractiveCard`, который:

- Меняет цвет при наведении
- Имеет анимацию при клике
- Поддерживает разные размеры (small, medium, large)
- Имеет состояние активности

### Задание 5: Комплексное задание

Создайте приложение "Управление задачами":

- Список задач с возможностью фильтрации
- Условное отображение разных состояний
- Динамические стили для разных типов задач
- Оптимизированный ререндеринг

### Задание 6: Модальное окно. Создайте переиспользуемый компонент модального окна с:

- Условным отображением
- Анимацией появления/исчезновения
- Возможностью закрытия по клику вне окна

### **Задание 7: Табы** Создайте компонент табов с:

- Динамическим содержимым
- Активными/неактивными состояниями
- Плавными переходами

### **Задание 8: Форма с валидацией** Создайте форму с:

- Условным отображением ошибок
- Динамическими стилями для валидации
- Оптимизированным ререндерингом
