import React from 'react';

function ImagePopup({ card, onClose }) {

    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) { onClose() };
    }

    return (
        // формочка увеличения карточки
        <div className={`popup popup_place_photos` + (card !== null && ' popup_visible')} onClick={handleOverlayClick}>
            <figure className="figure">
                <img className="popup__image" src={card?.link} alt={card?.name} />
                <figcaption className="popup__image-subtitle">{card?.name}</figcaption>
                <button className="popup__close-button" id="image-viewer_close-button" type="button" onClick={onClose}></button>
            </figure>
        </div>
    );
}

export default ImagePopup;