import PopupWithForm from "./PopupWithForm";
//import { useState } from "react";

export default function DeletePopup({ isOpen, onClose, onDelete }) {

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDelete}
    />
  );
}
