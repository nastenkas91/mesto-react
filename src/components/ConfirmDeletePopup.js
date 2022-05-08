import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, isLoading, onClose, onSubmit, onOverlayClick }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      submitTitle={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;
