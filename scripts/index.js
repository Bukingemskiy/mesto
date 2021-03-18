let popup = document.querySelector('.popup');
let editPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let PopupName = document.getElementById('popup_name');
let PopupText = document.getElementById('popup_text');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let PopupEdit = document.querySelector('.popup__edit');

function openPopup() {
    popup.classList.add('popup_visible');
    document.addEventListener("keyup", function(event) {
        if (event.key === "Enter" && popup.classList.contains('popup_visible')) {
          PopupEdit.submit();
        }
      });
}

function closePopup() {
    PopupName.value=title.textContent;
    PopupText.value=subtitle.textContent;
    popup.classList.remove('popup_visible');
}

function editPopup() {
    PopupName.setAttribute('value', title.textContent);
    PopupText.setAttribute('value', subtitle.textContent);
    openPopup();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    title.textContent = PopupName.value;
    subtitle.textContent = PopupText.value;
    closePopup();
}

editPopupBtn.addEventListener('click', editPopup);
closePopupBtn.addEventListener('click', closePopup);
PopupEdit.addEventListener('submit', formSubmitHandler);