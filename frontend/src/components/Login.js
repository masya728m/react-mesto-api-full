import React from 'react';
import PopupField from './PopupField';
import {authApi} from '../utils/Api';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fieldsValidity, setFieldsValidity] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    authApi.login(email, password)
      .then(props.onSuccess)
      .catch(props.onFail);
  };

  const handleEmailFieldValidity = () => {
    setFieldsValidity({
      ...fieldsValidity,
      emailFieldValidity: true,
      emailFieldErrorDescription: ''
    });
  };

  const handleEmailFieldError = (errorDescription) => {
    setFieldsValidity({
      ...fieldsValidity,
      emailFieldValidity: false,
      emailFieldErrorDescription: errorDescription
    });
  };

  const handlePasswordFieldValidity = () => {
    setFieldsValidity({
      ...fieldsValidity,
      passwordFieldValidity: true,
      passwordFieldErrorDescription: ''
    });
  };

  const handlePasswordFieldError = (errorDescription) => {
    setFieldsValidity({
      ...fieldsValidity,
      passwordFieldValidity: false,
      passwordFieldErrorDescription: errorDescription
    });
  };

  return (
    <div className="popup__container unauthorized-container">
      <form className="popup__form" name="popup__window" noValidate={true} onSubmit={handleSubmit}>
        <h2 className="popup__title popup__title_centered">Вход</h2>
        <fieldset className="popup__input-container unauthorized-container__fieldset">
          <PopupField
            additionalClass="unauthorized-container unauthorized-container__field"
            placeholderText="Email"
            fieldType="email"
            fieldValue={email}
            onChange={setEmail}
            onValidState={handleEmailFieldValidity}
            onErrorOccured={handleEmailFieldError}
            errorDescription={fieldsValidity.emailFieldErrorDescription}
          />
          <PopupField
            additionalClass="unauthorized-container unauthorized-container__field"
            placeholderText="Пароль"
            fieldType="text"
            minLength={6}
            fieldValue={password}
            onChange={setPassword}
            onValidState={handlePasswordFieldValidity}
            onErrorOccured={handlePasswordFieldError}
            errorDescription={fieldsValidity.passwordFieldErrorDescription}
          />
        </fieldset>
        <button
          type="submit"
          className={`popup__submit-button unauthorized-container__button ${(!fieldsValidity.passwordFieldValidity || !fieldsValidity.emailFieldValidity) && 'popup__submit-button_disabled'}`}
          disabled={(!fieldsValidity.passwordFieldValidity || !fieldsValidity.emailFieldValidity)}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
