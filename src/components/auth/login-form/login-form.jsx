import { useState } from "react";
import "./login-form.css";

export default function LoginForm() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    theme: "dark",
    notifications: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name обязателен";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name некорректен";
    }
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email некорректен";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Форма валидна:', formData);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRadioChange = (e) => {
    setFormData({
      theme: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="form-control"
        onChange={handleInputChange}
      />
      {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="form-control"
        onChange={handleInputChange}
      />
      {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      <input
        type="password"
        name="password"
        placeholder="********"
        className="form-control"
        onChange={handleInputChange}
      />
      {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      <input
        type="text"
        name="age"
        placeholder="Your age"
        className="form-control"
        onChange={handleInputChange}
      />

      <div className="check-theme">
        <label>
          <input
            className="radio-btn"
            type="radio"
            name="theme"
            value="light"
            checked={formData.theme === "light"}
            onChange={handleRadioChange}
          />
          Light
        </label>
        <label>
          <input
            className="radio-btn"
            type="radio"
            name="theme"
            value="dark"
            checked={formData.theme === "dark"}
            onChange={handleRadioChange}
          />
          Dark
        </label>
      </div>

      <div className="check-theme">
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleCheckboxChange}
          />
          Subscribe
        </label>

        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleCheckboxChange}
          />
          Notification
        </label>
      </div>
      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );

  // const nameID = useRef();
  // const emailID = useRef();
  // const passwordID = useRef();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`Data: `, {
  //     name: nameID.current.value,
  //     email: emailID.current.value,
  //     password: passwordID.current.value,
  //   });
  // };

  // return (
  //   <form className="user-form" onSubmit={handleSubmit}>
  //     <input ref={nameID} type="text" placeholder="Your name" className="form-control" />
  //     <input ref={emailID} type="email" placeholder="Your email" className="form-control" />
  //     <input ref={passwordID} type="password" placeholder="********" className="form-control" />
  //     <button type="submit" className="btn-submit">
  //       Submit
  //     </button>
  //   </form>
  // );
}
