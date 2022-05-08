import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";
import Popup from "./Popup";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlayClick }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(
      {
        name,
        link
      }
  )}

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name='add-card'
        title='Новое место'
        onClose={onClose}
        submitTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
        onSubmit={handleSubmit}
        onOverlayClick={onOverlayClick}
      >
        <input
          type="text"
          name="name"
          id="title"
          className="form__field form__field_type_card-title"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <span className="form__field-error title-error"></span>
        <input
          type="url"
          name="link"
          id="imgUrl"
          className="form__field form__field_type_card-img"
          required
          placeholder="Ссылка на картинку"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
        <span className="form__field-error imgUrl-error"></span>
      </PopupWithForm>
    </Popup>
  )
}

export default AddPlacePopup;
