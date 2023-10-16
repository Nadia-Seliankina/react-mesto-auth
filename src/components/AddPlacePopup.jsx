import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Стейт, в котором содержится значение инпута
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения во внешний обработчик
    const card = {
      name: name,
      link: link
    };
    onAddPlace(card);
  }

  // Очистка импутов
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Получения данных о названии места */}
      <input
        type="text"
        name="name"
        placeholder="Название"
        className="popup__input"
        id="name"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
      />
      <span
        id="name-error"
        name="name-error"
        className="popup__error popup__error_num_1"
      ></span>
      {/* Получения данных о ссылке на фото */}
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="link"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span
        id="link-error"
        name="link-error"
        className="popup__error popup__error_num_2"
      ></span>
    </PopupWithForm>
  );
}
