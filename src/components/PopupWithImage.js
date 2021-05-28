import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    static selectors = {
        popupImage: '.popup__image',
        imageCaption: '.popup__image-caption',
    };

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(PopupWithImage.selectors.popupImage);
        this._imageCaption = this._popup.querySelector(PopupWithImage.selectors.imageCaption);
    }

    open(title, image) {
        super.open();
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._imageCaption.textContent = title;
    }
}
