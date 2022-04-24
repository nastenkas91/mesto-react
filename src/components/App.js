import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
      <div className="page">
        <div className="page__wraper">
          <Header />
          <Main onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick} />
          <Footer />

          <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen}
                         onClose={closeAllPopups} submitTitle='Сохранить'>
            <input
              type="text"
              name="profileName"
              id="name"
              className="form__field form__field_type_name"
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
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
            />
            <span className="form__field-error occupation-error"></span>
          </PopupWithForm>

          <PopupWithForm name='add-card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
          submitTitle='Создать'>
            <input
              type="text"
              name="name"
              id="title"
              className="form__field form__field_type_card-title"
              minLength="2"
              maxLength="30"
              required
              placeholder="Название"
            />
            <span className="form__field-error title-error"></span>
            <input
              type="url"
              name="link"
              id="imgUrl"
              className="form__field form__field_type_card-img"
              required
              placeholder="Ссылка на картинку"
            />
            <span className="form__field-error imgUrl-error"></span>
          </PopupWithForm>

          <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} submitTitle='Да'>
          </PopupWithForm>

          <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups} submitTitle='Создать'>
            <input
              type="url"
              name="avatarLink"
              id="avatarUrl"
              className="form__field form__field_type_avatar"
              required
              placeholder="Ссылка на аватар"
            />
            <span className="form__field-error avatarUrl-error"></span>
          </PopupWithForm>

          {selectedCard && (
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}

        </div>
      </div>)}

export default App;
