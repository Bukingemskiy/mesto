import initialElements from './initialElements.js';
import Card from './Card.js';
import { setEventListeners } from './popups.js';
import { popupEdit, popupAdd, validationConfig } from './constants.js';
import FormValidator from './FormValidator.js';

initialElements.forEach((item) => {
    const card = new Card(item, '.element-item-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
    setEventListeners();
});

export const formEditProfile = new FormValidator(validationConfig, popupEdit);
export const formAddCard = new FormValidator(validationConfig, popupAdd);

formEditProfile.enableValidation();
formAddCard.enableValidation();
