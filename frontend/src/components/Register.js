import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handlMailChange(event) { setEmail(event.target.value) };
    function handlPasswordChange(event) { setPassword(event.target.value) };

    function handleSubmit(event) {
        event.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <div className="entrance">
            <h2 className="entrance__heading">Регистрация</h2>
            <form action="" className="form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    className="form__input"
                    required
                    type="email"
                    placeholder="Email"
                    onChange={handlMailChange}
                    value={email}
                />
                <input
                    name="password"
                    className="form__input"
                    required
                    type="password"
                    placeholder="Пароль"
                    onChange={handlPasswordChange}
                    value={password}
                />
                <button
                    className="entrance__button"
                    type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <p className="entrance__text">
                Уже зарегистрированы?
                <Link to="sign-in" className="entrance__link"> Войти</Link>
            </p>
        </div>
    );
}

export default withRouter(Register);