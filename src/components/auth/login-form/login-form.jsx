import { useState } from "react";
import "./login-form.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // show error and success message
  const [error, setError] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  // validation fields
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const storedData = localStorage.getItem("userdata");

    if (!storedData) {
      setError("Пользователь не найден. Пожалуйста зарегистрируйтесь");
      setSuccesMessage("");
      setTimeout(() => {
        navigate("/auth/register");
      }, 2000);
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Форма валидна:", formData);
      setErrors({});

      const userData = JSON.parse(storedData);

      if (
        userData.email === formData.email &&
        userData.password === formData.password
      ) {
        const loginData = {
          isLoggedIn: true,
          name: userData.name,
          email: userData.email,
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem("logindata", JSON.stringify(loginData));
        setSuccesMessage("Вы успешно авторизовались");
        setError("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Вы ввели неверные данные");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {error && <div className="form-error-message">{error}</div>}
      {succesMessage && (
        <div className="form-success-message">{succesMessage}</div>
      )}
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="form-control"
        onChange={handleInputChange}
      />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      <input
        type="password"
        name="password"
        placeholder="********"
        className="form-control"
        onChange={handleInputChange}
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password}</span>
      )}

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
