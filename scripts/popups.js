import { title, subtitle, editPopup, addPopup, popupEdit, popupAdd, popupName, popupText } from './constants.js';
import { formEditProfile, formAddCard } from './index.js';
import Card from './Card.js';

export function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closeOnOverlayOrCross);
}

export function closePopup(popup) {
    popup.classList.remove('popup_visible');
    popup.classList.add('popup__transition');
    document.removeEventListener('keydown', closePopupEsc);
    popup.removeEventListener('click', closeOnOverlayOrCross);
}

function closePopupEsc(evt) {
    const popup = document.querySelector('.popup_visible');
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function closeOnOverlayOrCross(evt) {
    const popup = document.querySelector('.popup_visible');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
    }
}

function clearPopupErrors(popup) {
    const popupInputs = popup.querySelectorAll('.popup__input');
    const popupSpans = popup.querySelectorAll('.popup__input-error');
    popupInputs.forEach((popupInput) => {
        popupInput.classList.remove('popup__input_error-type');
    });
    popupSpans.forEach((popupSpan) => {
        popupSpan.classList.remove('popup__input-error_active');
    });
}

function openEditPopup() {
    popupName.value = title.textContent;
    popupText.value = subtitle.textContent;
    formEditProfile.toggleButtonState();
    clearPopupErrors(editPopup);
    openPopup(editPopup);
}

function openAddPopup() {
    formAddCard.toggleButtonState();
    clearPopupErrors(addPopup);
    openPopup(addPopup);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = popupName.value;
    subtitle.textContent = popupText.value;
    closePopup(editPopup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const addNameInput = document.getElementById('popup_title');
    const addLinkInput = document.getElementById('popup_link');
    const element = {
        name: addNameInput.value,
        link: addLinkInput.value,
    };
    const card = new Card(element, '.element-item-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
    evt.target.reset();
    closePopup(addPopup);
}

export function setEventListeners() {
    const editPopupBtn = document.querySelector('.profile__edit-button');
    const addPopupBtn = document.querySelector('.profile__add-button');
    editPopupBtn.addEventListener('click', openEditPopup);
    addPopupBtn.addEventListener('click', openAddPopup);
    popupEdit.addEventListener('submit', editFormSubmitHandler);
    popupAdd.addEventListener('submit', addFormSubmitHandler);
}
