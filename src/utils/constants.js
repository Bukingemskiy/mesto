const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const updateAvatar = '.profile__image';
const editPopup = '.edit-profile';
const addPopup = '.add-card';
const updatePopup = '.update-avatar';
const imagePopup = '.card-image';
const deleteCardPopup = '.delete-card';
const cardListSelector = '.elements';
const cardSelector = '.element-item-template';
const editPopupBtn = '.profile__edit-button';
const addPopupBtn = '.profile__add-button';
const formEdit = '.popup__edit-form';
const formAdd = '.popup__add-form';
const formUpdate = '.popup__update-form';

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
    profileAvatar,
    updateAvatar,
    editPopup,
    addPopup,
    updatePopup,
    imagePopup,
    deleteCardPopup,
    cardListSelector,
    cardSelector,
    editPopupBtn,
    addPopupBtn,
    formEdit,
    formAdd,
    formUpdate,
    popupName,
    popupText,
    validationConfig,
};
