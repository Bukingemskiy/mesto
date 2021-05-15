import Popup from './Popup.js';
import { popupImage, imageCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(popupImage);
        this._imageCaption = this._popup.querySelector(imageCaption);
    }
    open(title, image) {
        super.open();
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._imageCaption.textContent = title;
    }
}
