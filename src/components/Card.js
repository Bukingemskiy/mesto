export default class Card {
    static selectors = {
        buttonDelete: '.element__delete',
        card: '.element',
        buttonLike: '.element__icon',
        cardImage: '.element__image',
        cardName: '.element__title',
        buttonLikeActive: 'element__icon_active',
    };

    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(Card.selectors.card)
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        const deleteBtn = this._element.querySelector(Card.selectors.buttonDelete);
        deleteBtn.addEventListener('click', () => {
            deleteBtn.closest(Card.selectors.card).remove();
        });
        this._element.querySelector(Card.selectors.buttonLike).addEventListener('click', (evt) => {
            evt.target.classList.toggle(Card.selectors.buttonLikeActive);
        });
        this._element.querySelector(Card.selectors.cardImage).addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector(Card.selectors.cardImage);
        this._setEventListeners();
        this._element.querySelector(Card.selectors.cardName).textContent = this._title;
        elementImage.src = this._image;
        elementImage.alt = this._title;
        return this._element;
    }
}
