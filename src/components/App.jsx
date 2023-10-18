import { useCallback, useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import ImagePopup from "./ImagePopup";
import avatarImage from "../images/avatar.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as apiReact from "../utils/apiReact";

function App() {
  // Хук, управляющий состоянием попапа РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа НОВОЕ МЕСТО
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа ОБНОВИТЬ АВАТАР
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа БОЛЬШОЙ КАРТИНКИ
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  // Хук, управляющий состоянием попапа УДАЛИТЬ
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа ИНФО
  const [isInfoToolOk, setIsInfoToolOk] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  // Контекст, чтобы все компоненты приложения могли получить доступ к этим данным
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: avatarImage,
  });

  // Стейт для данных из API
  const [cards, setCards] = useState([]);

  // Статус загрузки
  //const [isLoading, setIsLoading] = useState(false);

  // Статус пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  //const loggedInStorage = JSON.parse(localStorage.getItem('loggedIn'));
  //const [loggedIn, setLoggedIn] = useState(loggedInStorage);

  // EMAIL пользователя
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleInfoPopupOpen = () => {
    setIsInfoPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardLike = (card) => {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => {
      return i._id === currentUser._id;
    });

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (dataUser) => {
    api
      .editProfile(dataUser)
      .then((dataUser) => {
        console.log(dataUser);
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((dataUser) => {
        console.log(dataUser);
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
  };

  useEffect(() => {
    if (loggedIn) {
    api
      .getAllInfo()
      .then(([dataUser, dataCards]) => {
        console.log([dataUser, dataCards]);
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }}, [loggedIn]);

  const handleAddPlaceSubmit = (card) => {
    //setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
    //.finally(() => {
    //setIsLoading(true)});
  };

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  };

  const handleSubmitDelete = useCallback(
    function (e) {
      e.preventDefault();
      api
        .removeCard(selectedCard._id)
        .then((res) => {
          setCards((state) => {
            return state.filter((item) => {
              return item._id !== selectedCard._id;
            });
          });
          closeAllPopups();
        })
        .catch((err) => console.log(err));
    },
    [selectedCard]
  );

  // ПРОВЕРКА ТОКЕНА
  const auth = (token) => {
    return apiReact.checkToken(token).then((res) => {
      if (token) {
        setLoggedIn(true);
        //localStorage.setItem('loggedIn', true)
        const emailStorage = localStorage.getItem('email');
        console.log(emailStorage);
        setUserEmail(emailStorage);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    auth(token);
  }, []);

  const handleRegister = ({ email, password }) => {
    return apiReact
      .register({ email, password })
      //.then((res) => {
        //if (!res || res.statusCode === 400)
          //throw new Error("Что-то пошло не так");
        //return res;
      //})
      .then(() => {
        handleInfoPopupOpen();
        setIsInfoToolOk(true);
        navigate("/sign-in", { replace: true });
      })
  };

  const handleLogin = (email, password) => {
    //console.log(email, password);
    return apiReact
      .authorize(email, password)
      .then((res) => {
        //if (!res) throw new Error("Неправильные имя пользователя или пароль");
        if (res.token) {
          console.log(res, 'token');
          localStorage.setItem("token", res.token);
          setUserEmail(email);
          //console.log(email);
          setLoggedIn(true);
          //localStorage.setItem('loggedIn', true)
          navigate("/", { replace: true });
          localStorage.setItem('email', email);
        }
      })
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    //localStorage.removeItem("email");
    setLoggedIn(false);
    //localStorage.setItem('loggedIn', false)
    navigate("/sign-up");
  };

  useEffect(() => { 
    if (loggedIn) navigate('/'); 
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLogged={loggedIn}
          userEmail={userEmail}
          onSignOut={onSignOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
              <ProtectedRoute element={Footer} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
           />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        {/* Pop-up Редактировать профиль */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* Pop-up Обновить аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Pop-up Новое место */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* Pop-up Вы уверены? */}
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleSubmitDelete}
        />
        {/* Pop-up big image*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {/* Pop-up infoToolTip */}
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          infoToolOk={isInfoToolOk}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
