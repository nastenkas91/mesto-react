import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function ConfirmDeletePopup({ isOpen, isLoading, onClose, onSubmit, onOverlayClick }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        onClose={onClose}
        submitTitle={isLoading ? 'Удаление...' : 'Да'}
        onSubmit={handleSubmit}
        onOverlayClick={onOverlayClick}
      >
      </PopupWithForm>
    </Popup>
  )
}

export default ConfirmDeletePopup;
