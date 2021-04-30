const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.edit-profile');
const addPopup = document.querySelector('.add-card');
const imagePopup = document.querySelector('.card-image');
const popupEdit = document.querySelector('.popup__edit-form');
const popupAdd = document.querySelector('.popup__add-form');
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
    title,
    subtitle,
    editPopup,
    addPopup,
    imagePopup,
    popupEdit,
    popupAdd,
    popupName,
    popupText,
    validationConfig,
};
