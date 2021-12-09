import React from 'react';
import PopupBase from './PopupBase';
import '../pages/index.css';

export default class ImagePopup extends PopupBase {
  render() {
    return (
      <div className={`popup popup_type_${this.props.name} ${this.props.opened && 'popup_opened'}`} tabIndex="0">
        <div className="popup__overview-container">
          <img className="popup__overview-image skeleton" alt={this.props.imageName} src={this.props.imageLink}/>
          <button className="popup__exit-button" type="button" onClick={this.props.onClose}/>
          <h2 className="popup__overview-text">{this.props.imageName}</h2>
        </div>
      </div>
    );
  }
}