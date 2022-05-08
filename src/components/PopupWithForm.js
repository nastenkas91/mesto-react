import React from "react";
import {useEffect, useRef} from "react";

function PopupWithForm({ title, name, isOpen, onClose, submitTitle, children, onSubmit, onOverlayClick }) {

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
      <div ref={popup} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
        <div className={`popup__container popup__container_type_${name}`}>
          <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose} ></button>
          <h2 className={`popup__name popup__name_type_${name}`}>{ title }</h2>
          <form className="form" name={`${name}Form`} onSubmit={onSubmit}>
            { children }
          <button aria-label={submitTitle} type="submit" className="form__submit-btn" onSubmit={onSubmit}>{submitTitle}</button>
          </form>
        </div>
      </div>
    );
}

export default PopupWithForm;
