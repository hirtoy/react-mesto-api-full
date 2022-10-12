import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        //основной контент
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-place">
                    <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                    <button type="button" className="profile__avatar-overlay" onClick={props.onEditAvatar}></button>
                </div>

                <div className="profile__text">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button"
                        className="profile__edit-button"
                        title="Редактировать профиль"
                        aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button"
                    className="profile__add-button"
                    id="element__add-button"
                    title="Добавить фото"
                    aria-label="Добавить фото" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>

    );
}

export default Main;