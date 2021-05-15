import Popup from './Popup.js';
import { popupForm, popupInput, inputError, inputErrorType, inputErrorActive } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerFormSubmit) {
        super(popupSelector);
        this._handlerFormSubmit = handlerFormSubmit;
        this._form = this._popup.querySelector(popupForm);
    }

    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll(popupInput));
        const formInputs = {};
        inputList.forEach((input) => {
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

    clearPopupErrors() {
        const popupInputs = this._form.querySelectorAll(popupInput);
        const popupSpans = this._form.querySelectorAll(inputError);
        popupInputs.forEach((popupInput) => {
            popupInput.classList.remove(inputErrorType);
        });
        popupSpans.forEach((popupSpan) => {
            popupSpan.classList.remove(inputErrorActive);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
