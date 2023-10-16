import mestoImage from '../images/Mesto.svg';
import { NavLink } from 'react-router-dom';

export default function Header({ isLogged, userLogged, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={mestoImage} alt="Логотип" />
            <nav className="header__container">
                <NavLink className="header__link" to="/sign-in">Войти</NavLink>
                <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
                {isLogged && (
                    <>
                    <p className="header__user">{userLogged}</p>
                    <button className="header__btn" onClick={onSignOut}>Выйти</button>
                    </>
                )}
                
            </nav>
        </header>
    )
}