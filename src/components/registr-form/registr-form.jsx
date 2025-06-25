import { useForm } from "react-hook-form";
import "./regisrt-form.css";

export default function RegistrForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    formData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const validatePassword = (value) => {
    if (value.length < 8) return "Минимум 8 символов";
    if (!/(?=.*[a-z])/.test(value)) return "Нужна строчная буква";
    if (!/(?=.*[A-Z])/.test(value)) return "Нужна заглавная буква";
    if (!/(?=.*\d)/.test(value)) return "Нужна цифра";
    return true;
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="form-control"
        {...register("name", {
          required: "Имя обязательно",
          minLength: {
            value: 3,
            message: "Минимум 3 символа",
          },
          validate: {
            noSpaces: (value) => !/\s/.test(value) || "Пробелы не разрешены",
            notAdmin: (value) => value !== "admin" || 'Имя "admin" запрещено',
          },
        })}
      />
      {errors.name && (
        <span style={{ color: "red" }}>{errors.name.message}</span>
      )}
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="form-control"
        {...register("email", { required: "Email обязательно" })}
      />
      {errors.email && (
        <span style={{ color: "red" }}>{errors.email.message}</span>
      )}
      <input
        type="password"
        name="password"
        placeholder="********"
        className="form-control"
        {...register("password", {
          required: "Пароль обязательно",
          validate: validatePassword,
        })}
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password.message}</span>
      )}
      <input
        type="password"
        name="confirmPassword"
        placeholder="********"
        className="form-control"
        {...register("confirmPassword", {
          required: "Пароль обязательно",
          validate: (value) => value === password || "Пароли не совпадают",
        })}
      />
      {errors.confirmPassword && (
        <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
      )}

      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
}
