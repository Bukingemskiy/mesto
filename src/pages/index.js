import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    profileTitle,
    profileSubtitle,
    profileAvatar,
    updateAvatar,
    formEdit,
    formAdd,
    formUpdate,
    editPopup,
    addPopup,
    updatePopup,
    imagePopup,
    deleteCardPopup,
    popupName,
    popupText,
    cardListSelector,
    cardSelector,
    editPopupBtn,
    addPopupBtn,
    validationConfig,
} from '../utils/constants.js';

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/',
    token: '22c6286b-d5fa-40bf-b483-a71816fa51e0',
    cohortId: 'cohort-24',
});

let client = null;

const popupDelete = new PopupDeleteCard(deleteCardPopup, handlerDeleteCard);
popupDelete.setEventListeners();

function handlerDeleteCard(id, card) {
    popupDelete.renderLoading(true);
    api.deleteCard(id)
        .then(() => {
            card.removeCard();
            popupDelete.close();
        })
        .catch((err) => console.log(`${err}`))
        .finally(() => {
            popupDelete.renderLoading(false);
        });
}

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

function handleCardClick(title, image) {
    popupWithImage.open(title, image);
}

const createCard = (data) => {
    const card = new Card(data, cardSelector, client._id, api, {
        handleCardClick,
        handleDeleteClick: () => {
            const id = data._id;
            popupDelete.open(id, card);
        },
    });
    return card.generateCard();
};

const cardList = new Section((item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}, cardListSelector);

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

Promise.all([api.getUserData(), api.getCards()])
    .then(([user, cards]) => {
        client = user;
        userInfo.setUserInfo({ name: user.name, about: user.about });
        userInfo.setAvatar({ avatar: user.avatar });
        cardList.renderItems(cards);
    })
    .catch((err) => console.log(`${err}`));

const popupWithFormEdit = new PopupWithForm(editPopup, handlerFormEdit);
popupWithFormEdit.setEventListeners();

function handlerFormEdit(data) {
    popupWithFormEdit.renderLoading(true);
    api.editProfile({ ...data, name: data.name, about: data.info })
        .then((result) => {
            userInfo.setUserInfo({ name: result.name, about: result.about });
            popupWithFormEdit.close();
        })
        .catch((err) => console.log(`${err}`))
        .finally(() => {
            popupWithFormEdit.renderLoading(false);
        });
}

const editValidator = new FormValidator(validationConfig, document.querySelector(formEdit));
editValidator.enableValidation();

document.querySelector(editPopupBtn).addEventListener('click', () => {
    const profile = userInfo.getUserInfo();
    popupName.value = profile.name;
    popupText.value = profile.about;
    popupWithFormEdit.open();
    editValidator.toggleButtonState();
});

const popupWithFormUpdate = new PopupWithForm(updatePopup, handlerFormUpdate);
popupWithFormUpdate.setEventListeners();

function handlerFormUpdate(data) {
    popupWithFormUpdate.renderLoading(true);
    api.updateImage({ ...data, avatar: data.avatar })
        .then((result) => {
            userInfo.setAvatar({ avatar: result.avatar });
            popupWithFormUpdate.close();
        })
        .catch((err) => console.log(`${err}`))
        .finally(() => {
            popupWithFormUpdate.renderLoading(false);
        });
}

const updateValidator = new FormValidator(validationConfig, document.querySelector(formUpdate));
updateValidator.enableValidation();

document.querySelector(updateAvatar).addEventListener('click', () => {
    popupWithFormUpdate.open();
    updateValidator.toggleButtonState();
});

const popupWithFormAdd = new PopupWithForm(addPopup, handlerFormAdd);
popupWithFormAdd.setEventListeners();

function handlerFormAdd(data) {
    popupWithFormAdd.renderLoading(true);
    api.makeCard({ ...data, name: data.title, link: data.link })
        .then((result) => {
            cardList.addItem(createCard(result));
            popupWithFormAdd.close();
        })
        .catch((err) => console.log(`${err}`))
        .finally(() => {
            popupWithFormAdd.renderLoading(false);
        });
}

const addValidator = new FormValidator(validationConfig, document.querySelector(formAdd));
addValidator.enableValidation();

document.querySelector(addPopupBtn).addEventListener('click', () => {
    popupWithFormAdd.open();
    addValidator.toggleButtonState();
});
