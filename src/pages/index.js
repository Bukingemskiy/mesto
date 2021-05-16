import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import initialElements from '../utils/initialElements.js';
import {
    profileTitle,
    profileSubtitle,
    formEdit,
    formAdd,
    editPopup,
    addPopup,
    imagePopup,
    popupName,
    popupText,
    cardListSelector,
    cardSelector,
    editPopupBtn,
    addPopupBtn,
    validationConfig,
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle);

function handleCardClick(title, image) {
    popupWithImage.open(title, image);
}

const createCard = (items) => {
    const card = new Card(items, cardSelector, handleCardClick);
    return card.generateCard();
};

const defaultCards = new Section(
    {
        items: initialElements,
        renderer: (item) => {
            const cardElement = createCard(item);
            defaultCards.addItem(cardElement);
        },
    },
    cardListSelector
);

defaultCards.renderItems();

const popupWithFormEdit = new PopupWithForm(editPopup, handlerFormEdit);
popupWithFormEdit.setEventListeners();

function handlerFormEdit(data) {
    const element = {
        name: data.name,
        info: data.info,
    };
    userInfo.setUserInfo(element);
    popupWithFormEdit.close();
}

const editValidator = new FormValidator(validationConfig, document.querySelector(formEdit));
editValidator.enableValidation();

const popupWithFormAdd = new PopupWithForm(addPopup, handlerFormAdd);
popupWithFormAdd.setEventListeners();

function handlerFormAdd(data) {
    const element = {
        name: data.title,
        link: data.link,
    };
    defaultCards.addItem(createCard(element));
    popupWithFormAdd.close();
}

const addValidator = new FormValidator(validationConfig, document.querySelector(formAdd));
addValidator.enableValidation();

document.querySelector(editPopupBtn).addEventListener('click', () => {
    const profile = userInfo.getUserInfo();
    popupName.value = profile.name;
    popupText.value = profile.info;
    popupWithFormEdit.open();
    editValidator.toggleButtonState();
});

document.querySelector(addPopupBtn).addEventListener('click', () => {
    popupWithFormAdd.open();
    addValidator.toggleButtonState();
});
