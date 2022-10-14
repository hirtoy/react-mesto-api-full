import React from 'react';
import ok from '../images/ok.svg';
import err from '../images/ok_icon.svg';

function InfoTooltip({ isRegisered, isOpen, onClose }) {

    const img = isRegisered ? ok : err;

    return (
        <div className={`popup ${isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__window popup__window-place">
                <div className="popup__wrapper">
                    <img className="popup__img" src={img} alt={InfoTooltip ? 'Ошибка' : 'Успешно'} />
                    <p className="popup__message">{isRegisered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так. \n Попробуйте еще раз'}</p>
                </div>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;