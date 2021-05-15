export default class userInfo {
    constructor(nameSelector, infoSelector) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    getUserInfo() {
        const element = {
            name: this._name.textContent,
            info: this._info.textContent,
        };
        return element;
    }

    setUserInfo({ name, info }) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}
