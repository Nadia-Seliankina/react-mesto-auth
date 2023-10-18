import mestoImage from '../images/Mesto.svg';
import { NavLink } from 'react-router-dom';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

export default function Header({ isLogged, userEmail, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={mestoImage} alt="Логотип" />
            <div className="header__container">
                <Routes>
                    <Route path="/sign-up" element={
                        <NavLink className="header__link" to="/sign-in">Войти</NavLink>
                    } />
                    <Route path="/sign-in" element={
                        <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
                    } />
                    <Route path="/" element={isLogged && (
                        <>
                            <h2 className="header__user">{userEmail}</h2>
                            {/*<h2 className="header__user">{userLogged.email}</h2>*/}
                            <button type='button' className="header__btn" onClick={onSignOut}>Выйти</button>
                        </>
                    )} />
                </Routes>

            </div>
        </header>
    )
}