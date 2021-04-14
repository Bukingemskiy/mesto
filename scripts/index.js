const formElement = document.querySelector('.popup__edit');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);
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
const popupOverlay = document.querySelector('.popup__overlay');
const popupEdit = document.getElementById('popup_edit');
const popupAdd = document.getElementById('popup_add');
const popupEditSaveBtn = popupEdit.querySelector('.popup__save-button');
const popupAddSaveBtn = popupAdd.querySelector('.popup__save-button');
const addNameInput = document.getElementById('popup_title');
const addLinkInput = document.getElementById('popup_link');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
const elements = document.querySelector('.elements');
const elementItemTemplate = document.querySelector('.element-item-template').content;
const initialElements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
];

initialElements.forEach(addElement);

function addElement(element) {
    const elementItem = createElementItem(element);
    elements.prepend(elementItem);
}

function createElementItem(item) {
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
    const elementImage = elementItem.querySelector('.element__image');
    elementImage.addEventListener('click', openImagePopup);
    return elementItem;
}

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupOverlay);
}

function closePopupOverlay(evt) {
    const popup = document.querySelector('.popup_visible');
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
    }
}

function closePopupEsc(evt) {
    const popup = document.querySelector('.popup_visible');
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
    popup.classList.add('popup__transition');
    clearPopupErrors(popup);
    document.removeEventListener('keydown', closePopupEsc);
}

function clearPopupErrors(popup) {
    const popupInputs = popup.querySelectorAll('.popup__input');
    const popupSpans = popup.querySelectorAll('.popup__input-error');
    popupInputs.forEach((popupInput) => {
        popupInput.classList.remove('popup__input_error-type');
    });
    popupSpans.forEach((popupSpan) => {
        popupSpan.classList.remove('popup__input-error_active');
    });
}

function openEditPopup() {
    popupName.value = title.textContent;
    popupText.value = subtitle.textContent;
    popupEditSaveBtn.classList.remove('popup__save-button_disabled');
    popupEditSaveBtn.removeAttribute('disabled', 'disabled');
    openPopup(editPopup);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = popupName.value;
    subtitle.textContent = popupText.value;
    closePopup(editPopup);
}

function openAddPopup() {
    addNameInput.value = '';
    addLinkInput.value = '';
    popupAddSaveBtn.classList.add('popup__save-button_disabled');
    popupAddSaveBtn.setAttribute('disabled', 'disabled');
    openPopup(addPopup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const element = {
        name: addNameInput.value,
        link: addLinkInput.value,
    };
    addElement(element);
    closePopup(addPopup);
}

function openImagePopup(evt) {
    const eventTargetImage = evt.target.parentElement;
    const image = eventTargetImage.querySelector('.element__image');
    const caption = eventTargetImage.querySelector('.element__title');
    popupImage.src = image.src;
    imageCaption.textContent = caption.textContent;
    openPopup(imagePopup);
}

editPopupBtn.addEventListener('click', openEditPopup);
addPopupBtn.addEventListener('click', openAddPopup);
closeEditPopupBtn.addEventListener('click', () => closePopup(editPopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPopup));
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));
popupEdit.addEventListener('submit', editFormSubmitHandler);
popupAdd.addEventListener('submit', addFormSubmitHandler);
