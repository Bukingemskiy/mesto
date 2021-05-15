import { buttonDelete, card, buttonLike, cardImage, cardName, buttonLikeActive } from '../utils/constants.js';

export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(card).cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        const deleteBtn = this._element.querySelector(buttonDelete);
        deleteBtn.addEventListener('click', () => {
            deleteBtn.closest(card).remove();
        });
        this._element.querySelector(buttonLike).addEventListener('click', (evt) => {
            evt.target.classList.toggle(buttonLikeActive);
        });
        this._element.querySelector(cardImage).addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector(cardImage);
        this._setEventListeners();
        this._element.querySelector(cardName).textContent = this._title;
        elementImage.src = this._image;
        elementImage.alt = this._title;
        return this._element;
    }
}
