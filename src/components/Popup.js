export default class Popup {
    static selectors = {
        popupVisible: 'popup_visible',
        popupTransition: 'popup__transition',
        closeBtn: 'popup__close-button',
    };

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    open() {
        this._popup.classList.add(Popup.selectors.popupVisible);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove(Popup.selectors.popupVisible);
        this._popup.classList.add(Popup.selectors.popupTransition);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _closeOnOverlayOrCross(evt) {
        if (
            evt.target.classList.contains(Popup.selectors.popupVisible) ||
            evt.target.classList.contains(Popup.selectors.closeBtn)
        ) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => this._closeOnOverlayOrCross(evt));
    }
}
