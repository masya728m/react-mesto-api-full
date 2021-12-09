import React from 'react';
import '../pages/index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const likeModifier = 'places__like-button_liked';

  const handleCardLike = () => {
    props.onLike?.(props.cardObj);
  };

  const handleCardDelete = () => {
    props.onDelete?.(props.cardObj);
  };

  function handleCardClick() {
    props.onClick?.(props.cardObj);
  }

  return (
    <div className="places__place">
      <img className="places__image skeleton" alt={props.placeName} src={props.placeImage} onClick={handleCardClick}/>
      <div className="places__info">
        <h2 className="places__name">{props.placeName}</h2>
        <div className="places__like-container">
          <button
            className={
              `places__like-button ${props.likes.some(like => like._id === currentUser.profileId) && likeModifier}`
            }
            type="button"
            onClick={handleCardLike}/>
          <p className="places__like-counter">{props.likes.length > 0 && props.likes.length}</p>
        </div>
        {currentUser.profileId === props.ownerId &&
        <button className="places__delete-button" type="button" onClick={handleCardDelete}/>}
      </div>
    </div>
  );
}