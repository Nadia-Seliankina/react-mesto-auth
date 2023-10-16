import { useEffect, useState } from "react";
import avatarImage from "../images/avatar.jpg";
import editImage from "../images/Edit.svg";
import plusImage from "../images/Plus.svg";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete
}) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          name="avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={`${currentUser?.avatar}`}
            alt="аватар"
            //style={{ backgroundImage: `url(${currentUser?.avatar})` }}
          >
          </img>
        </button>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              name="edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-button-image"
                src={editImage}
                alt="Редактировать"
              />
            </button>
          </div>
          <p className="profile__activity">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          name="add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-image"
            src={plusImage}
            alt="Добавить"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardData) => (
            <li key={cardData._id} className="element">
              <Card
                src={cardData.link}
                alt={cardData.name}
                title={cardData.name}
                likes={cardData.likes.length}
                onCardClick={onCardClick}
                card={cardData}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
