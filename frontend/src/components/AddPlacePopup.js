import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(name) { setName(name.target.value) };
    function handleChangeLink(link) { setLink(link.target.value) };

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({ name, link });
    }

    React.useEffect(
        () => {
            setName('');
            setLink('');
        }, [isOpen]
    );

    return (
        <PopupWithForm
            title="Новое место"
            name="add"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Создать">

            <label className="popup__field">
                <input className="popup__form-item popup__form-item_place_elements popup__form-item_value_place-name"
                    id="titleinput"
                    name="titleinput"
                    type="text"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleChangeName}
                    required />
                <span className="popup__form-error titleinput-error"></span>
            </label>

            <label className="popup__field">
                <input className="popup__form-item popup__form-item_place_elements popup__form-item_value_place-url"
                    id="linkinput"
                    name="linkinput"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleChangeLink}
                    required />
                <span className="popup__form-error linkinput-error"></span>
            </label>
        </PopupWithForm>
    );
}
export default AddPlacePopup;