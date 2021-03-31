const editPopup = document.getElementById('edit_popup');
const addPopup = document.getElementById('add_popup');
const imagePopup = document.getElementById('image_popup');
const addPopupBtn = document.querySelector('.profile__add-button');
const editPopupBtn = document.querySelector('.profile__edit-button');
const closeEditPopupBtn = editPopup.querySelector('.popup__close-button');
const closeAddPopupBtn = addPopup.querySelector('.popup__close-button');
const closeImagePopupBtn = imagePopup.querySelector('.popup__close-button');
const popupName = document.getElementById('popup_name');
const popupText = document.getElementById('popup_text');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupEdit = document.getElementById('popup_edit');
const popupAdd = document.getElementById('popup_add');
const addNameInput = document.getElementById('popup_title');
const addLinkInput = document.getElementById('popup_link');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
const elements = document.querySelector('.elements');
const elementItemTemplate = document.querySelector('.element-item-template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const cards = initialCards.forEach(item => {
const elementItem = elementItemTemplate.cloneNode(true);
  elementItem.querySelector('.element__title').textContent = item.name;
  elementItem.querySelector('.element__image').src = item.link;
  elementItem.querySelector('.element__icon').addEventListener('click', function (evt) {
const eventTargetLike = evt.target;
  eventTargetLike.classList.toggle('element__icon_active');
});
const deleteBtn = elementItem.querySelector('.element__delete');
  deleteBtn.addEventListener('click', function () {
  deleteBtn.closest('.element').remove();
});
  elementItem.querySelector('.element__image').addEventListener('click', openImagePopup);
  elements.prepend(elementItem)
});

console.log(cards);

function openEditPopup() {
  popupName.value=title.textContent;
  popupText.value=subtitle.textContent;
  editPopup.classList.add('popup_visible');
}

function closePopup(popup) {
  popup.classList.toggle('popup_visible');
  popup.classList.add('popup_invisible');
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = popupName.value;
  subtitle.textContent = popupText.value;
  closePopup(editPopup);
}

function openAddPopup() {
  addNameInput.value='';
  addLinkInput.value='';
  addPopup.classList.add('popup_visible');
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();
const addName = addNameInput.value;
const addLink = addLinkInput.value;
const elementItem = elementItemTemplate.cloneNode(true);
  elementItem.querySelector('.element__title').textContent = addName;
  elementItem.querySelector('.element__image').src = addLink;
  elementItem.querySelector('.element__icon').addEventListener('click', function (evt) {
const eventTargetLike = evt.target;
  eventTargetLike.classList.toggle('element__icon_active');
});
const deleteBtn = elementItem.querySelector('.element__delete');
  deleteBtn.addEventListener('click', function () {
  deleteBtn.closest('.element').remove();
});
  elementItem.querySelector('.element__image').addEventListener('click', openImagePopup);
  elements.prepend(elementItem);
  closePopup(addPopup);
}

function openImagePopup(evt) {
const eventTargetImage = evt.target.parentElement;
const image = eventTargetImage.querySelector('.element__image');
const caption = eventTargetImage.querySelector('.element__title');
  popupImage.src = image.src;
  imageCaption.textContent = caption.textContent;
  imagePopup.classList.add('popup_visible');
}

editPopupBtn.addEventListener('click', openEditPopup);
addPopupBtn.addEventListener('click', openAddPopup);
closeEditPopupBtn.addEventListener('click', () => closePopup(editPopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPopup));
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
popupEdit.addEventListener('submit', editFormSubmitHandler);
popupAdd.addEventListener('submit', addFormSubmitHandler);