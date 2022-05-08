import React, {useEffect, useRef} from "react";

function ImagePopup({ card, onClose, onOverlayClick }) {
  const popup = useRef();

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    function handleOverlayClickClose(e) {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose)
    popup.current.addEventListener('mousedown', handleOverlayClickClose)

    return () => {
      popup.current.removeEventListener('mousedown', handleOverlayClickClose)
      document.removeEventListener('keydown', handleEscClose)
    }
  })

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`} ref={popup} onClick={onOverlayClick}>
      <div className="popup__container popup__container_type_image">
        <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose}></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
