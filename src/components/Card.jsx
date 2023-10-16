import likeImage from "../images/Vector.svg";
import deleteImage from "../images/Delete.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({
  src,
  alt,
  title,
  likes,
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
}) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => {
    return i._id === currentUser._id;
  });

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <>
      <button
        className="element__image-button"
        name="image-button"
        type="button"
        aria-label="Открыть фото"
        onClick={handleClick}
      >
        <img className="element__image" src={src} alt={alt} />
      </button>
      <div className="element__group">
        <h2 className="element__title">{title}</h2>
        <div className="element__how-like">
          <button
            name="button-like"
            type="button"
            className="element__button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          >
            <img
              className={cardLikeButtonClassName}
              src={likeImage}
              alt="Нравится"
            />
          </button>
          <h3 className="element__counter">{likes}</h3>
        </div>
      </div>
      {isOwn && (
        <button
          name="button-delete"
          type="button"
          className="element__delete"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        >
          <img
            className="element__delete-image"
            src={deleteImage}
            alt="Удалить"
          />
        </button>
      )}
    </>
  );
}
