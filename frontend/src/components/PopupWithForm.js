import React from 'react';

function PopupWithForm(props) {

    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) { props.onClose() };
    }

    return (
        //редактирование профиля
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_visible'}`} onClick={handleOverlayClick}>
            <div className="popup__window">
                <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit} method="post">
                    <h2 className="popup__heading">{props.title}</h2>
                    {props.children}
                    <button className="popup__submit-button popup__profile-submit" type="submit">{props.buttonText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;