import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/api";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  //состояние попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  //данные карточки для превью и для удаления
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [selectedCardId, setSelectedCardId] = useState('');

  //данные пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //состояние загрузчика
  const [loadingButton, setLoadingButton] = useState(false)

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(res => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch(((err) => {
        console.log(err)
      }))
  }, [])

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
    setSelectedCard({ isOpen: true, ...card });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleDeleteClick(card) {
    setConfirmPopupOpen(true);
    setSelectedCardId(card._id);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setSelectedCardId('')
  }

  function handleUpdateUser(data) {
    setLoadingButton(true);
    api.editProfileInfo({userName: data.name, occupation: data.about})
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(((err) => {
        console.log(err)
      }))
      .finally(() => setLoadingButton(false));
  }

  function handleUpdateAvatar(link) {
    setLoadingButton(true);
    api.editAvatar(link)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(((err) => {
        console.log(err)
      }))
      .finally(() => setLoadingButton(false));
  }

  function handleCardDelete() {
    setLoadingButton(true);
    api.deleteCard(selectedCardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== selectedCardId));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setLoadingButton(true);
    api.addNewCard(data)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingButton(false));
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__wraper">
            <Header />
            <Main
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              handleDeleteClick={handleDeleteClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDeleteConfirm={handleCardDelete}
            />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={loadingButton}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={loadingButton}
            />

            <ConfirmDeletePopup
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              cardId={selectedCardId}
              onSubmit={handleCardDelete}
              isLoading={loadingButton}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={loadingButton}
            />

            {selectedCard && (
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />
            )}

          </div>
        </CurrentUserContext.Provider>
      </div>)}

export default App;
