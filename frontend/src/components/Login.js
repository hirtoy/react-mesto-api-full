import React from 'react';

function LogIn({onAuthorise}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(event) { setEmail(event.target.value) };
    function handlePasswordChange(event) { setPassword(event.target.value) };

    function handleAuthorize(event) {
        event.preventDefault();
        if (!email || !password) {
            return;
          }
          onAuthorise({ email, password });
        }

    return (
        <div className="entrance">
            <h2 className="entrance__heading">Вход</h2>
            <form action="" className="form" onSubmit={handleAuthorize}>
                <input
                id="email"
                className="form__input" 
                type="email" 
                value={email || ""} 
                required placeholder="Email" 
                onChange={handleEmailChange} />

                <input 
                id="password"
                className="form__input" 
                type="password" 
                value={password || ""} 
                required 
                placeholder="Пароль" 
                onChange={handlePasswordChange} />
                <button className="entrance__button" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default LogIn;