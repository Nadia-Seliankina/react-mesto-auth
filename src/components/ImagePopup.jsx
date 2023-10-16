import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup({ isOpen, card, onClose }
) {
  // Исользуем JavaScript-шаблон для склейки значения атрибута
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
  <section className={classNamePopup} id="popup-big-image">
      <div className="popup__container-big-image">
        {/*оператор опциональной последовательности*/}
        <img className="popup__big-photo" src={card?.link} alt={card?.name} />
        <h2 className="popup__title-big-image">{card?.name}</h2>
        <button
          name="popup-image-button-close"
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          id="popup-image-button-close"
          onClick={onClose}
        >
          <img className="popup__button-image" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </section>
  );
}
