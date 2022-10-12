import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__remove-button element__remove-button${!isOwn && '_hidden'}`
  );

  const LikesButtonClassName = (
    `element__heart-icon ${isLiked ? 'element__heart-icon_active' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteCard}></button>
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes-counter">
          <button className={LikesButtonClassName} type="button" onClick={() => { props.onCardLike(props.card) }}></button>
          <p className="element__heart-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;