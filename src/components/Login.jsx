import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(123);

    if (email && password) {
      onLogin(email, password)
        .then(() => {
          resetForm();
          console.log(456);
        })
        .catch((err) => setMessage(err.message || "Что-то пошло не так"));
    }
  };

  return (
    <section className="enter" id="enter-sign-in">
      <div className="enter__container">
        <h2 className="enter__heading">Вход</h2>
        <p className="enter__error">{message}</p>
        <form className="enter__form" onSubmit={handleSubmit}>
          <fieldset className="enter__fieldset">
            {/* Получения данных о email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="enter__input"
              id="inputEmail"
              required
              minLength="2"
              maxLength="40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Получения данных о пароле */}
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className="enter__input"
              id="inputPassword"
              required
              minLength="8"
              maxLength="40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button type="submit" className="enter__button-save">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
