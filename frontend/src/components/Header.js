import React from 'react';
import logo from '../images/logo.svg';
import '../pages/index.css';

export default function Header(props) {
  const headerButtonStates = {
    [true]: 'header__button_state_expand',
    [false]: 'header__button_state_close'
  };

  const [headerButtonState, setHeaderButtonState] = React.useState(false);

  const handleHeaderButtonClick = () => {
    setHeaderButtonState(!headerButtonState);
  };

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="logo"/>
        <button
          onClick={handleHeaderButtonClick}
          className={`header__button header__text_type_button ${headerButtonStates[headerButtonState]}`}
          type="button"
        />
      </div>
      <div className={`header__side-container ${headerButtonState && 'header_hidden'}`}>
        {props.children}
      </div>
    </header>
  );
}