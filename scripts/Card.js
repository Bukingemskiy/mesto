import { imagePopup } from './constants.js';
import { openPopup, closePopup } from './popups.js';

export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _handleOpenImagePopup() {
        const popupImage = document.querySelector('.popup__image');
        const imageCaption = document.querySelector('.popup__image-caption');
        popupImage.src = this._image;
        imageCaption.textContent = this._title;
        openPopup(imagePopup);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        const deleteBtn = this._element.querySelector('.element__delete');
        deleteBtn.addEventListener('click', () => {
            deleteBtn.closest('.element').remove();
        });
        this._element.querySelector('.element__icon').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__icon_active');
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenImagePopup();
        });
        imagePopup.querySelector('.popup__close-button').addEventListener('click', function (evt) {
            closePopup(imagePopup);
            evt.stopPropagation();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__image').src = this._image;
        return this._element;
    }
}
