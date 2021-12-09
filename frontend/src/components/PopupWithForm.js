import React from 'react';
import PopupBase from './PopupBase';
import '../pages/index.css';

export default class PopupWithForm extends PopupBase {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit?.();
  };

  render() {
    return (
      <div className={`popup popup_type_${this.props.name} ${this.props.opened && 'popup_opened'}`}>
        <div className="popup__container">
          <form className="popup__form" name="popup__window" noValidate={true} onSubmit={this.handleSubmit}>
            <button className="popup__exit-button" type="button" onClick={this.props.onClose}/>
            <h2 className="popup__title popup__title_centered">{this.props.title}</h2>
            {
              this.props.children ? (
                (<fieldset className="popup__input-container">
                  {this.props.children}
                </fieldset>)
              ) : (<></>)
            }
            <button
              type="submit"
              className={`popup__submit-button ${this.props.enableSubmitButton ? '' : 'popup__submit-button_disabled'}`}
              disabled={!this.props.enableSubmitButton}
            >
              {this.props.buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}