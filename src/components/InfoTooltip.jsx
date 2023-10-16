import closeIcon from "../images/Close-icon-react.png";
import unionOk from "../images/Union-ok.png";
import unionNo from "../images/Union-no.png";

export default function InfoTooltip({ isOpen, infoToolOk, onClose }) {
  // Исользуем JavaScript-шаблон для склейки значения атрибута
  const classNamePopup = `info ${isOpen ? "info_opened" : ""}`;

  return (
    <section className={classNamePopup}>
      <div className="info__container">
        {infoToolOk ? (
          <>
            <img className="info__union" src={unionOk} alt="OK" />
            <h2 className="info__text">Вы успешно зарегистрировались!</h2>
          </>
        ) : (
          <>
            <img className="info__union" src={unionNo} alt="NO" />
            <h2 className="info__text">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          </>
        )}
        <button
          name="button-close"
          type="button"
          className="info__button-close"
          aria-label="Закрыть"
          id="popup-button-close"
          onClick={onClose}
        >
          <img className="info__button-image" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </section>
  );
}
