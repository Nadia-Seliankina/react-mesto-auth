import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    //const [formValue, setFormValue] = useState({
    //email: '',
    //password: ''
    //})

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    //const handleChange = (e) => {
    //const {name, value} = e.target;

    //setFormValue({
    //...formValue,
    //[name]: value
    //});
    //}

    //const handleSubmit = (e) => {
    //e.preventDefault();
    // здесь нужно будет добавить логин
    //if (!formValue.email || !formValue.password){
    //return;
    //}
    //auth.authorize(formValue.email, formValue.password)
    //.then((data) => {
    // нужно проверить, есть ли у данных JWT
    // сбросьте стейт, затем в колбэке установите
    // стейт loggedIn родительского App как true,
    // затем перенаправьте его в /
    //if (data.jwt){
    //setFormValue({email: '', password: ''});
    //handleLogin();
    //navigate('/', {replace: true});
    //}
    //})
    //.catch(err => console.log(err));
    //}

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(123);

        if (email && password) {
            onLogin(email, password)
            .then(() => {
                resetForm();
                console.log(456);
            })
        }
    };

    return (
        <section className="enter" id="enter-sign-in">
            <div className="enter__container">
                <h2 className="enter__heading">Вход</h2>
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
                            //onChange={handleChange}
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
                            //value={formValue.password}
                            //onChange={handleChange}
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
