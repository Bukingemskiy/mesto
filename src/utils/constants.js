const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const editPopup = '.edit-profile';
const addPopup = '.add-card';
const imagePopup = '.card-image';
const cardListSelector = '.elements';
const cardSelector = '.element-item-template';
const editPopupBtn = '.profile__edit-button';
const addPopupBtn = '.profile__add-button';
const formEdit = '.popup__edit-form';
const formAdd = '.popup__add-form';

const popupName = document.getElementById('popup_name');
const popupText = document.getElementById('popup_text');

const validationConfig = {
    formSelector: '.popup__edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_error-type',
    errorClass: 'popup__input-error_active',
};

export {
    profileTitle,
    profileSubtitle,
    editPopup,
    addPopup,
    imagePopup,
    cardListSelector,
    cardSelector,
    editPopupBtn,
    addPopupBtn,
    formEdit,
    formAdd,
    popupName,
    popupText,
    validationConfig,
};
