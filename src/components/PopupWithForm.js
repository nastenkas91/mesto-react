function PopupWithForm({ title, name, isOpen, onClose, submitTitle, children }) {

  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_${name}`}>
          <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose}></button>
          <h2 className={`popup__name popup__name_type_${name}`}>{ title }</h2>
          <form className="form" name={`${name}Form`} noValidate>
            { children }
          <button aria-label={submitTitle} type="submit" className="form__submit-btn">{submitTitle}</button>
          </form>
        </div>
      </div>
    );
}

export default PopupWithForm;
