import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = useRef();

  // вызываем нужный метод на поле current объекта
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
        avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Получения данных о ссылке на аватар */}
      <input
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        className="popup__input"
        id="link-avatar"
        required
        // указали элементу атрибут ref => получили прямой доступ к DOM-элементу импута
        ref={avatarRef}
      />
      <span
        id="link-error-avatar"
        name="link-error"
        className="popup__error popup__error_num_2"
      ></span>
    </PopupWithForm>
  );
}
