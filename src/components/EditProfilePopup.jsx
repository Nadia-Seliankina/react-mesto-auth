import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Стейт, в котором содержится значение инпута
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    const dataUser = {
      name: name,
      about: description,
    };
    onUpdateUser(dataUser);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Получения данных о имени */}
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className="popup__input"
        id="inputName"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span
        id="name-user-error"
        name="name-error"
        className="popup__error popup__error_num_1"
      ></span>
      {/* Получения данных о деятельности */}
      <input
        type="text"
        name="about"
        placeholder="Вид деятельности"
        className="popup__input"
        id="inputActivity"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
      />
      <span
        id="about-error"
        name="about-error"
        className="popup__error popup__error_num_2"
      ></span>
    </PopupWithForm>
  );
}
