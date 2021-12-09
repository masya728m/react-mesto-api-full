import React from 'react';
import PopupWithForm from './PopupWithForm';

export const EditAvatarPopup = React.memo((props) => {
  const [buttonText, setButtonText] = React.useState('');
  const inputFieldRef = React.useRef(null);
  const [validity, setValidity] = React.useState(null);

  React.useEffect(() => {
    setButtonText('Сохранить');
    inputFieldRef.current.value = '';
    setValidity({});
  }, [props.isOpen]);

  const handleSubmit = () => {
    setButtonText('Сохранение...');
    props.onSubmit?.({profileAvatar: inputFieldRef.current.value});
  };

  const handleChange = (e) => {
    setValidity({
      valid: e.target.validity.valid,
      errorMessage: e.target.validationMessage
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      opened={props.isOpen}
      title="Обновить аватар"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      enableSubmitButton={validity?.valid}
    >

      <div className="popup__field-wrapper">
        <input
          className="popup__field"
          type="url"
          name="profile-avatar"
          placeholder="Ссылка на картинку"
          minLength={2}
          maxLength={500}
          required={true}
          ref={inputFieldRef}
          onChange={handleChange}
        />
        <p className="popup__field-error">
          {validity?.errorMessage || ''}
        </p>
      </div>
    </PopupWithForm>
  );
});