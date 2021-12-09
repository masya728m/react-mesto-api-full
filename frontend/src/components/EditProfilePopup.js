import React from 'react';
import PopupField from './PopupField';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export const EditProfilePopup = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [buttonText, setButtonText] = React.useState('');
  const [fieldsValidity, setFieldsValidity] = React.useState({});
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    if (!props.isOpen)
      return;
    setButtonText('Сохранить');
    setFieldsValidity({
      profileNameFieldValidity: true,
      profileAboutFieldValidity: true
    });
  }, [props.isOpen]);

  const handleSubmit = () => {
    setButtonText('Сохранение...');
    props.onSubmit?.({profileName: name, profileAbout: description});
  };

  const handleProfileNameFieldValidity = () => {
    setFieldsValidity({
      ...fieldsValidity,
      profileNameFieldErrorDescription: '',
      profileNameFieldValidity: true
    });
  };

  const handleProfileNameFieldError = (errorDescription) => setFieldsValidity({
    ...fieldsValidity,
    profileNameFieldErrorDescription: errorDescription,
    profileNameFieldValidity: false
  });

  const handleProfileAboutFieldValidity = () => setFieldsValidity({
    ...fieldsValidity,
    profileAboutFieldErrorDescription: '',
    profileAboutFieldValidity: true
  });

  const handleProfileAboutFieldError = (errorDescription) => setFieldsValidity({
    ...fieldsValidity,
    profileAboutFieldErrorDescription: errorDescription,
    profileAboutFieldValidity: false
  });

  return (
    <PopupWithForm
      name="profile-edit"
      opened={props.isOpen}
      title="Редактировать профиль"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      enableSubmitButton={fieldsValidity.profileNameFieldValidity && fieldsValidity.profileAboutFieldValidity}
    >
      <PopupField
        fieldType="text"
        fieldName="profile-name"
        placeholderText="Имя"
        minLength={2}
        maxLength={30}
        errorDescription={fieldsValidity.profileNameFieldErrorDescription}
        fieldValue={name}
        onChange={(text) => setName(text)}
        onValidState={handleProfileNameFieldValidity}
        onErrorOccured={handleProfileNameFieldError}
      />
      <PopupField
        fieldType="text"
        fieldName="profile-about"
        placeholderText="О себе"
        minLength={2}
        maxLength={30}
        errorDescription={fieldsValidity.profileAboutFieldErrorDescription}
        fieldValue={description}
        onChange={(text) => setDescription(text)}
        onValidState={handleProfileAboutFieldValidity}
        onErrorOccured={handleProfileAboutFieldError}
      />
    </PopupWithForm>
  );
});