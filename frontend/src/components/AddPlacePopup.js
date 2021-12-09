import React from 'react';
import PopupField from './PopupField';
import PopupWithForm from './PopupWithForm';

export const AddPlacePopup = React.memo((props) => {
  const [buttonText, setButtonText] = React.useState('');
  const [fieldsValidity, setFieldsValidity] = React.useState({});
  const [placeName, setPlaceName] = React.useState('');
  const [placeImage, setPlaceImage] = React.useState('');

  React.useEffect(() => {
    setButtonText('Создать');
    setFieldsValidity({});
    setPlaceName('');
    setPlaceImage('');
  }, [props.isOpen]);

  const handleSubmit = () => {
    setButtonText('Сохранение...');
    props.onSubmit?.({placeName, placeImage});
  };

  const handleImageLinkFieldValidity = () => {
    setFieldsValidity({
      ...fieldsValidity,
      imageLinkFieldErrorDescription: '',
      imageLinkFieldValidity: true
    });
  };

  const handlePlaceNameFieldValidity = () => {
    setFieldsValidity({
      ...fieldsValidity,
      placeNameFieldErrorDescription: '',
      placeNameFieldValidity: true
    });
  };

  const handleImageLinkFieldError = (errorDescription) => {
    setFieldsValidity({
      ...fieldsValidity,
      imageLinkFieldErrorDescription: errorDescription,
      imageLinkFieldValidity: false
    });
  };

  const handlePlaceNameFieldError = (errorDescription) => {
    setFieldsValidity({
      ...fieldsValidity,
      placeNameFieldErrorDescription: errorDescription,
      placeNameFieldValidity: false
    });
  };

  return (
    <PopupWithForm
      name="add-place"
      opened={props.isOpen}
      title="Новое место"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      enableSubmitButton={fieldsValidity.placeNameFieldValidity && fieldsValidity.imageLinkFieldValidity}
    >
      <PopupField
        fieldType="text"
        fieldName="place-name"
        placeholderText="Название"
        minLength={2}
        maxLength={30}
        errorDescription={fieldsValidity.placeNameFieldErrorDescription}
        fieldValue={placeName}
        onChange={setPlaceName}
        onValidState={handlePlaceNameFieldValidity}
        onErrorOccured={handlePlaceNameFieldError}
      />
      <PopupField
        fieldType="url"
        fieldName="image-link"
        placeholderText="Ссылка на картинку"
        errorDescription={fieldsValidity.imageLinkFieldErrorDescription}
        fieldValue={placeImage}
        onChange={setPlaceImage}
        onValidState={handleImageLinkFieldValidity}
        onErrorOccured={handleImageLinkFieldError}
      />
    </PopupWithForm>
  );
});