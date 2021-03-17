let popup = document.querySelector('.popup');
let editPopupBtn = document.getElementById('popup_open');
let closePopupBtn = document.querySelector('.popup__close-button');
let savePopupBtn = document.querySelector('.popup__save-button');
let PopupName = document.getElementById('popup_name');
let PopupText = document.getElementById('popup_text');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_visible');
}

function closePopup() {
    popup.classList.remove('popup_visible');
}

function editPopup() {
    PopupName.setAttribute('value', title.textContent);
    PopupText.setAttribute('value', subtitle.textContent);
    openPopup();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let PopupEdit = document.querySelector('.popup__edit');
    let inputs = PopupEdit.querySelectorAll('input');
    title.textContent = inputs[0].value;
    subtitle.textContent = inputs[1].value;
}

editPopupBtn.addEventListener('click', editPopup);
closePopupBtn.addEventListener('click', closePopup);
savePopupBtn.addEventListener('click', formSubmitHandler);