import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarUrl = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar(avatarUrl.current.value);
    }

    React.useEffect(
        () => {
            avatarUrl.current.value = "";
        }, [isOpen]
    );

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить">

            <label className="popup__field">
                <input className="popup__form-item popup__form-item_place_elements popup__form-item_value_place-avatar"
                    id="avatar-input"
                    name="avatar"
                    type="url"
                    placeholder="Ссылка на аватарку"
                    required
                    ref={avatarUrl} />
                <span className="popup__form-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;