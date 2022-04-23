import React from "react";

function Card({card, onClick}) {

  function handleClick() {
    onClick(card);
  }

  return (
    <li key={card._id} className="element">
      <img style={{ backgroundImage: `url(${card.link})` }} className="element__image" onClick={handleClick}/>
      <button aria-label="Удалить" type="button" className="element__delete-btn"></button>
      <div className="element__name-wraper">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button aria-label="Нравится" type="button" className="element__like-btn"></button>
          <p className="element__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )

}

export default Card;
