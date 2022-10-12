import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Api from '../utils/Api';
import * as Auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import LogIn from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [isRegistered, setIsRegistered] = React.useState(false);

  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true); }
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true); }
  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true); }
  const handleInfoTolltipOpen = () => { setIsInfoTooltipOpen(true) };
  const handleCardClick = (card) => { setSelectedCard(card); }

  const history = useHistory();

  React.useEffect(() => {
    handleTokenCheck()
  }, []);


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    Api.patchProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)

  }

  function handleUpdateAvatar(avatarUrl) {
    Api.patchProfilePhoto(avatarUrl)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(card) {
    Api.createNewCard(card.name, card.link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.updateLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) => { return prevState.map((c) => c._id === card._id ? newCard : c) });
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(res => {
        console.log(res)
        setCards((prevState) => prevState.filter((c) => c._id !== card._id && c));
      })
      .catch(console.error)
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            handleLogin(res.data.email);
          }
        })
        .catch(console.error)
    };
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        setIsRegistered(!res.error);

      })
      .catch(err => {
        console.log(err);
        setIsRegistered(false);
        handleInfoTolltipOpen(true);
      });
  }

  function handleAuthorize(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin(email);
          history.push("/");
        }
      })
      .catch(console.error)
  }

  function handleSignOut() {
    setCards([]);
    setEmail('');
    localStorage.removeItem('jwt');
  }

  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
    history.push('/main')
    Promise.all([Api.getProfile(), Api.getInitialCards()])
      .then(([profile, cards]) => {
        //отображаем информацию профиля    
        setCurrentUser(profile);
        //рисуем все карточки
        setCards(cards);
      })
      .catch(console.error)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} email={email} />

      <Switch>

        <ProtectedRoute
          exact path="/main"
          component={Main}
          isLoggedIn={isLoggedIn}
          email={email}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
        />


        <Route path="/sign-in">
          <LogIn onAuthorise={handleAuthorize} />
        </Route>

        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>

        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
        </Route>

      </Switch>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip isOpen={isInfoTooltipOpen} isRegistered={isRegistered} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);