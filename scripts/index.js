const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementItemTemplate = document.querySelector('.element-item-template').content;
const editPopup = document.querySelector('.popup__profile-edit');
const addPopup = document.querySelector('.popup__card-add');
const imagePopup = document.querySelector('.popup__card-image');
const addPopupBtn = document.querySelector('.profile__add-button');
const editPopupBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup__edit-form');
const popupAdd = document.querySelector('.popup__add-form');
const popupEditSaveBtn = popupEdit.querySelector('.popup__save-button');
const popupAddSaveBtn = popupAdd.querySelector('.popup__save-button');
const stringInactiveButtonClass = 'popup__save-button_disabled';
const popupEditCloseBtn = editPopup.querySelector('.popup__close-button');
const popupAddCloseBtn = addPopup.querySelector('.popup__close-button');
const popupImageCloseBtn = imagePopup.querySelector('.popup__close-button');
const popupName = document.getElementById('popup_name');
const popupText = document.getElementById('popup_text');
const addNameInput = document.getElementById('popup_title');
const addLinkInput = document.getElementById('popup_link');
const inputEditList = Array.from(editPopup.querySelectorAll('.popup__input'));
const inputAddList = Array.from(addPopup.querySelectorAll('.popup__input'));
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

function addElement(element) {
    const elementItem = createElementItem(element);
    elements.prepend(elementItem);
}

initialElements.forEach(addElement);

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupOverlay);
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
    toggleButtonState(inputEditList, popupEditSaveBtn, stringInactiveButtonClass);
    clearPopupErrors(editPopup);
    openPopup(editPopup);
}

function openAddPopup() {
    toggleButtonState(inputAddList, popupAddSaveBtn, stringInactiveButtonClass);
    clearPopupErrors(addPopup);
    openPopup(addPopup);
}

function openImagePopup(evt) {
    const eventTargetImage = evt.target.parentElement;
    const image = eventTargetImage.querySelector('.element__image');
    const caption = eventTargetImage.querySelector('.element__title');
    popupImage.src = image.src;
    imageCaption.textContent = caption.textContent;
    openPopup(imagePopup);
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

function closePopup(popup) {
    popup.classList.remove('popup_visible');
    popup.classList.add('popup__transition');
    document.removeEventListener('keydown', closePopupEsc);
    popup.removeEventListener('click', closePopupOverlay);
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

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = popupName.value;
    subtitle.textContent = popupText.value;
    closePopup(editPopup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const element = {
        name: addNameInput.value,
        link: addLinkInput.value,
    };
    addElement(element);
    evt.target.reset();
    closePopup(addPopup);
}

editPopupBtn.addEventListener('click', openEditPopup);
addPopupBtn.addEventListener('click', openAddPopup);
popupEdit.addEventListener('submit', editFormSubmitHandler);
popupAdd.addEventListener('submit', addFormSubmitHandler);
popupEditCloseBtn.addEventListener('click', function (evt) {
    closePopup(editPopup);
    evt.stopPropagation();
});
popupAddCloseBtn.addEventListener('click', function (evt) {
    closePopup(addPopup);
    evt.stopPropagation();
});
popupImageCloseBtn.addEventListener('click', function (evt) {
    closePopup(imagePopup);
    evt.stopPropagation();
});
