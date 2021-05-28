export default class Api {
    constructor({ address, token, cohortId }) {
        this._address = address;
        this._token = token;
        this._cohortId = cohortId;
    }

    _getAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        return fetch(`${this._address}${this._cohortId}/users/me `, {
            headers: {
                authorization: this._token,
            },
        }).then((res) => this._getAnswer(res));
    }

    editProfile(data) {
        return fetch(`${this._address}${this._cohortId}/users/me `, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data.name, about: data.about }),
        }).then((res) => this._getAnswer(res));
    }

    updateImage(data) {
        return fetch(`${this._address}${this._cohortId}/users/me/avatar `, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ avatar: data.avatar }),
        }).then((res) => this._getAnswer(res));
    }

    makeCard(data) {
        return fetch(`${this._address}${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data.name, link: data.link }),
        }).then((res) => this._getAnswer(res));
    }

    getCards() {
        return fetch(`${this._address}${this._cohortId}/cards`, {
            headers: {
                authorization: this._token,
            },
        }).then((res) => this._getAnswer(res));
    }

    deleteCard(id) {
        return fetch(`${this._address}${this._cohortId}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then((res) => this._getAnswer(res));
    }

    likeOn(id) {
        return fetch(`${this._address}${this._cohortId}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        }).then((res) => this._getAnswer(res));
    }

    likeOff(id) {
        return fetch(`${this._address}${this._cohortId}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then((res) => this._getAnswer(res));
    }
}
