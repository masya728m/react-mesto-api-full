import React from 'react';
import {Link, Route, Switch, useHistory, withRouter} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import '../pages/index.css';
import {authApi} from '../utils/Api';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {EditProfilePopup} from './EditProfilePopup';
import {EditAvatarPopup} from './EditAvatarPopup';
import {AddPlacePopup} from './AddPlacePopup';
import {ConfirmDialogPopup} from './ConfirmDialogPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [targetCard, setTargetCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [popupImageName, setPopupImageName] = React.useState('');
  const [popupImageLink, setPopupImageLink] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [authSuccess, setAuthSuccess] = React.useState(false);

  const appHistory = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token)
      return;
    authApi.setToken(token);
    setLoggedIn(true);
    appHistory.push('/');
  }, []);

  React.useEffect(() => {
    if (!loggedIn)
      return;
    Promise.all([authApi.getUserInfo(), authApi.getInitialCards()])
      .then(([info, cardList]) => {
        setCurrentUser({
          avatar: info.avatar,
          name: info.name,
          about: info.about,
          profileId: info._id,
          email: info.data.email
        });
        cardList = Array.from(cardList).map(card => {
          const isLiked = Array.from(card.likes).some(like => like._id === info._id);
          return {
            ...card,
            isLiked
          };
        });
        setCards(cardList);
      })
      .catch(err => {
        console.log(err);
      });
  }, [loggedIn]);

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);

  };

  const handleEditProfileSubmit = ({profileName, profileAbout}) => {
    authApi.setUserInfo({name: profileName, about: profileAbout})
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: profileName,
          about: profileAbout
        });
        closeAllPopups();
      })
      .catch(console.log);

  };

  const handleAddPlaceSubmit = ({placeName, placeImage}) => {
    authApi.addCard({name: placeName, link: placeImage})
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);

  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);

  };

  const handleEditAvatarSubmit = ({profileAvatar}) => {
    authApi.updateProfileImage(profileAvatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: profileAvatar
        });
        closeAllPopups();
      })
      .catch(console.log);

  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);

  };

  const handleCardClick = (card) => {
    setPopupImageName(card.name);
    setPopupImageLink(card.link);
    setImagePopupOpen(true);

  };

  const handleCardLike = (card) => {
    const isLiked = !Array.from(card.likes).some(like => like._id === currentUser.profileId);
    authApi.changeLikeCardStatus(isLiked, card._id)
      .then(cardObj => {
        cardObj.isLiked = isLiked;
        const newCards = Array.from(cards).map(card => card._id === cardObj._id ? cardObj : card);
        setCards(newCards);
      })
      .catch(console.log);

  };

  const handleCardDelete = (card) => {
    setTargetCard(card);
    setConfirmPopupOpen(true);
  };

  const handleDeleteConfirmSubmit = () => {
    console.log(targetCard);
    authApi.deleteCard(targetCard._id)
      .then(() => {
        setCards(cards.filter(card => card._id !== targetCard._id));
        closeAllPopups();
      })
      .catch(console.log);

  };

  const handleLoginSuccess = (res) => {
    console.log(res);
    if (!res.token)
      return;
    localStorage.setItem('jwt', res.token);
    setLoggedIn(true);
    appHistory.push('/');
  };

  const handleRegisterSuccess = () => {
    setAuthSuccess(true);
    setInfoTooltipOpen(true);
  };

  const handleAuthFail = () => {
    setAuthSuccess(false);
    setInfoTooltipOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header>
          {loggedIn ?
            (
              <>
                <h2 className="header__text">{currentUser.email}</h2>
                <Link
                  to="/login"
                  className="header__text header__text_type_button"
                  type="button"
                  onClick={() => {
                    setLoggedIn(false);
                    localStorage.removeItem('jwt');
                  }}
                >
                  Выйти
                </Link>
              </>
            ) :
            (
              appHistory.location.pathname === '/login' ?
                (
                  <Link
                    to="/register"
                    className="header__text header__text_type_button"
                    type="button"
                  >
                    Зарегистрироваться
                  </Link>
                ) :
                (
                  <Link
                    to="/login"
                    className="header__text header__text_type_button"
                    type="button"
                  >
                    Войти
                  </Link>
                )
            )}
        </Header>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          success={authSuccess}
          onClose={closeAllPopups}
          title="Вы успешно зарегистрировались"
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditAvatarSubmit}
        />

        <ConfirmDialogPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteConfirmSubmit}
        />
        <ImagePopup
          name="image-overview"
          opened={isImagePopupOpen}
          imageName={popupImageName}
          imageLink={popupImageLink}
          onClose={closeAllPopups}
        />
        <Switch>
          <Route exact path="/login">
            <Login onSuccess={handleLoginSuccess} onFail={handleAuthFail}/>
          </Route>

          <Route exact path="/register">
            <Register onSuccess={handleRegisterSuccess} onFail={handleAuthFail}/>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
        </Switch>
        {loggedIn && <Footer/>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
