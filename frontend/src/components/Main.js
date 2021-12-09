import '../pages/index.css';
import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar skeleton" src={currentUser.avatar} alt="avatar"/>
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
          <h2 className="profile__description">{currentUser.about}</h2>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="places">
        {props.cards.map((card) =>
          (
            <Card
              key={card._id}
              cardObj={card}
              cardId={card._id}
              placeName={card.name}
              placeImage={card.link}
              likes={card.likes}
              ownerId={card.owner._id}
              isLiked={card.isLiked}
              onLike={props.onCardLike}
              onDelete={props.onCardDelete}
              onClick={props.onCardClick}
            />
          )
        )}
      </section>
    </main>
  );
}