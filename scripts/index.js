let popup = document.querySelector('.popup');
let editPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let popupName = document.getElementById('popup_name');
let popupText = document.getElementById('popup_text');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let popupEdit = document.querySelector('.popup__edit');

function openPopup() {
    popupName.value=title.textContent;
    popupText.value=subtitle.textContent;
    popup.classList.add('popup_visible');
}

function closePopup() {
    popup.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    title.textContent = popupName.value;
    subtitle.textContent = popupText.value;
    closePopup();
}

editPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupEdit.addEventListener('submit', formSubmitHandler);