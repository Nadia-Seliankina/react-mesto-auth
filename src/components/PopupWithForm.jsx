import { Children } from "react";
import closeIcon from "../images/Close-Icon.svg";

export default function PopupWithForm({
  name,
  title,
  children,
  btnText,
  isOpen,
  onClose,
  onSubmit,
}) {
  // Исользуем JavaScript-шаблон для склейки значения атрибута
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <section className={classNamePopup} id={`popup-${name}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <fieldset className="popup__fieldset">{children}</fieldset>
          <button
            name="button-save"
            type="submit"
            className="popup__button-save"
          >
            {btnText}
          </button>
        </form>
        <button
          name="popup-button-close"
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          id="popup-button-close"
          onClick={onClose}
        >
          <img className="popup__button-image" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </section>
  );
}
