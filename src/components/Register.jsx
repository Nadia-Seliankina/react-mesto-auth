import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const navigate = useNavigate();

    //const [formValue, setFormValue] = useState({
    //email: '',
    //password: ''
    //})

    //const navigate = useNavigate();

    //const handleChange = (e) => {
    //const { name, value } = e.target;

    //setFormValue({
    //...formValue,
    //[name]: value
    //});
    //}

    //const handleSubmit = (e) => {
    //e.preventDefault();
    // здесь обработчик регистрации
    //auth.register(formValue.email, formValue.password)
    //.then((res) => {
    //navigate('/sign-in', { replace: true });
    //setFormValue({email: '', password: ''});
    //})
    //.catch((err) => {
    //console.log(err);
    //infoToolNo();
    //})
    //}

    const handleSubmit = async (e) => {
        e.preventDefault();

        onRegister({ password, email })
            //.then(resetForm)
            //.then((res) => {
                //navigate("/sign-in", { replace: true });
            //})
    };

    return (
        <section className="enter" id="enter-sign-up">
            <div className="enter__container">
                <h2 className="enter__heading">Регистрация</h2>
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
                            //value={formValue.email}
                            value={email}
                            //onChange={handleChange}
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
                            //value={formValue.password}
                            value={password}
                            //onChange={handleChange}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <button type="submit" className="enter__button-save">
                        Зарегистрироваться
                    </button>
                </form>
                <Link className="enter__link" to="/sign-in">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </section>
    );
}
