import PopupWithForm from './PopupWithForm'
import React from "react";
import { useContext, useState, useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onOverlayClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser])


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      submitTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <input
        type="text"
        name="profileName"
        id="name"
        className="form__field form__field_type_name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <span className="form__field-error name-error"></span>
      <input
        type="text"
        name="profileOccupation"
        id="occupation"
        className="form__field form__field_type_occupation"
        minLength="2"
        maxLength="200"
        required
        placeholder="Род деятельности"
        value={description}
        onChange={evt => setDescription(evt.target.value)}
      />
      <span className="form__field-error occupation-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
