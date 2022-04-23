import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose}></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
