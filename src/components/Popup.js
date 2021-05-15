import { popupVisible, popupTransition, closeBtn } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add(popupVisible);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove(popupVisible);
        this._popup.classList.add(popupTransition);
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', (evt) => this._closeOnOverlayOrCross(evt));
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _closeOnOverlayOrCross(evt) {
        if (evt.target.classList.contains(popupVisible) || evt.target.classList.contains(closeBtn)) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => this._closeOnOverlayOrCross(evt));
    }
}
