import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(name) { setName(name.target.value) };
    function handleChangeDescription(description) { setDescription(description.target.value) };

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить">

            <label className="popup__field">
                <input className="popup__form-item popup__form-item_value_name"
                    id="name-input"
                    name="username"
                    type="text"
                    placeholder="Жак-Ив Кусто"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name ?? ''}
                    onChange={handleChangeName} />
                <span className="popup__form-error name-input-error"></span>
            </label>

            <label className="popup__field">
                <input className="popup__form-item popup__form-item_value_description"
                    id="about-input"
                    name="about"
                    type="text"
                    placeholder="Исследователь океана"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description ?? ''}
                    onChange={handleChangeDescription} />
                <span className="popup__form-error about-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;