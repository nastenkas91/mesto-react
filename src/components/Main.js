import React, {useEffect} from "react";
import editAvatarImg from '../images/editAvatar.svg';
import { api } from "../utils/api";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar)
      })
      .catch(((err) => {
        console.log(err)
      }))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(((err) => {
        console.log(err)
      }))
  }, [])

  return (<main>
    <section className="profile">
      <div className="profile__avatar-container">
        <img style={{ backgroundImage: `url(${userAvatar})` }} alt={userName} className="profile__avatar"
             onClick={ onEditAvatar } />
        <img src={editAvatarImg} alt="Изменить аватар"
             className="profile__avatar-edit-btn" />
      </div>
      <div className="profile__info">
        <div className="profile__name-wraper">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__occupation">{userDescription}</p>
        </div>
        <button aria-label="Редактировать профиль" type="button" className="profile__edit-btn" onClick={ onEditProfile }></button>
      </div>
      <button aria-label="Добавить" type="button" className="profile__add-img-btn" onClick={ onAddPlace }></button>
    </section>

    <section className="elements">
      <ul className="elements__list">
        {
          cards.map(card => <Card key={card._id} card={card} onClick={onCardClick} />
          )
        }
      </ul>
    </section>
  </main>
  )
}

export default Main;
