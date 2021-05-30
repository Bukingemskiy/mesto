export default class Card {
    static selectors = {
        buttonDelete: '.element__delete',
        buttonDeleteVisible: 'element__delete_visible',
        card: '.element',
        buttonLike: '.element__icon',
        cardImage: '.element__image',
        cardName: '.element__title',
        buttonLikeActive: 'element__icon_active',
        buttonLikeNumber: '.element__number',
    };

    constructor(data, cardSelector, currentUser, api, { handleCardClick, handleDeleteClick }) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._owner = data.owner._id;
        this._currentUser = currentUser;
        this._api = api;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data._id;
        this._data = data;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(Card.selectors.card)
            .cloneNode(true);
        return cardElement;
    }

    _isLiked() {
        let like = false;
        this._data.likes.forEach((user) => {
            const usersArray = Object.values(user);
            if (usersArray.includes(this._currentUser)) {
                like = true;
            }
        });
        return like;
    }

    _setEventListeners() {
        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
        this._likeBtn.addEventListener('click', () => {
            if (!this._isLiked()) {
                this._api
                    .likeOn(this._data._id)
                    .then((data) => {
                        this._data.likes = data.likes;
                        this._likeBtn.classList.add(Card.selectors.buttonLikeActive);
                        this._likeCounter.textContent = this._data.likes.length;
                    })
                    .catch((err) => console.log(`${err}`));
            } else {
                this._api
                    .likeOff(this._data._id)
                    .then((data) => {
                        this._data.likes = data.likes;
                        this._likeBtn.classList.remove(Card.selectors.buttonLikeActive);
                        this._likeCounter.textContent = this._data.likes.length;
                    })
                    .catch((err) => console.log(`${err}`));
            }
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeCounter = this._element.querySelector(Card.selectors.buttonLikeNumber);
        this._elementImage = this._element.querySelector(Card.selectors.cardImage);
        this._likeBtn = this._element.querySelector(Card.selectors.buttonLike);
        this._deleteBtn = this._element.querySelector(Card.selectors.buttonDelete);
        this._setEventListeners();
        this._element.querySelector(Card.selectors.cardName).textContent = this._title;
        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        if (this._owner === this._currentUser) {
            this._deleteBtn.classList.add(Card.selectors.buttonDeleteVisible);
            this._deleteBtn.removeAttribute('disabled', 'disabled');
        }
        if (this._data.likes) {
            this._likeCounter.textContent = this._data.likes.length;
        }
        if (this._isLiked()) {
            this._likeBtn.classList.add(Card.selectors.buttonLikeActive);
        }
        return this._element;
    }

    removeCard() {
        this._element.remove();
    }
}
