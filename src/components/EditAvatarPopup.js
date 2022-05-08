import PopupWithForm from "./PopupWithForm";
import { useRef,useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClick }) {
  const avatarLink = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  }

  useEffect(() => {
    avatarLink.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      submitTitle={isLoading ? 'Создание...' : 'Создать'}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <input
        ref={avatarLink}
        type="url"
        name="avatarLink"
        id="avatarUrl"
        className="form__field form__field_type_avatar"
        required
        placeholder="Ссылка на аватар"
      />
      <span className="form__field-error avatarUrl-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;