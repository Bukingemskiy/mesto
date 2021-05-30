import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    static selectors = {
        popupForm: '.popup__edit',
        popupInput: '.popup__input',
        popupBtn: '.popup__save-button',
    };

    constructor(popupSelector, handlerFormSubmit) {
        super(popupSelector);
        this._handlerFormSubmit = handlerFormSubmit;
        this._form = this._popup.querySelector(PopupWithForm.selectors.popupForm);
        this._inputList = Array.from(this._form.querySelectorAll(PopupWithForm.selectors.popupInput));
        this._popupBtn = this._popup.querySelector(PopupWithForm.selectors.popupBtn);
        this._popupBtnText = this._popupBtn.textContent;
    }

    _getInputValues() {
        const formInputs = {};
        this._inputList.forEach((input) => {
            formInputs[input.name] = input.value;
        });
        return formInputs;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._popupBtn.textContent = 'Сохранение...';
        } else {
            this._popupBtn.textContent = this._popupBtnText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}
