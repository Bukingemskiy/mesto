import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    static selectors = {
        popupBtn: '.popup__save-button',
    };

    constructor(popupSelector, handlerDeleteCard) {
        super(popupSelector);
        this._handlerDeleteCard = handlerDeleteCard;
    }

    open(id, card) {
        super.open();
        this._id = id;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(PopupDeleteCard.selectors.popupBtn).addEventListener('click', () => {
            this._handlerDeleteCard(this._id, this._card);
        });
    }
}
