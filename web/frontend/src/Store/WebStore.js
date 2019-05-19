import { EventEmitter } from 'events';

import { apiPost, verifyLogin } from './Helper';

const link =
    process.env.NODE_ENV === 'production'
        ? 'https://mohammedwazier.ddns.net/'
        : '/';

class WebStore extends EventEmitter {
    constructor() {
        super();
        this.user = {};
        this.notification = {
            text: '',
            color: '',
        };
    }

    setCurrentUser = data => {
        this.user = data;
        this.emit('UPDATE_USER');
    };

    getCurrentUser = () => {
        return this.user;
    };

    getToken() {
        if (this.checkLocalStorage()) {
            return localStorage._token;
        } else {
            this.clearLocalStorage();
            return '-';
        }
    }

    getId() {
        if (this.checkLocalStorage()) {
            return localStorage._userID;
        } else {
            this.clearLocalStorage();
            return '-';
        }
    }
    getUsername() {
        if (this.checkLocalStorage()) {
            return localStorage._username;
        } else {
            this.clearLocalStorage();
            return '-';
        }
    }

    setStorage = (key, value) => {
        localStorage.setItem(key, value);
        return true;
    };

    clearStorage = callback => {
        localStorage.clear();
        callback(true);
    };

    checkLocalStorage() {
        if (Object.keys(localStorage).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    login = body => {
        const url = `${link}api/login`;
        return new Promise(resolve => {
            apiPost(url, body, '', response => {
                resolve(response);
            });
        });
    };

    register = body => {
        const url = `${link}api/register`;
        return new Promise(resolve => {
            apiPost(url, body, '', response => {
                resolve(response);
            });
        });
    };

    checkRegis = () => {
        const url = `${link}api/checkRegisBoard`;
        var body = {
            username: this.getUsername()
        }
        return new Promise(resolve => {
            apiPost(url, body, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    checkUser = () => {
        const url = `${link}api/checkuser`;
        return new Promise(resolve => {
            verifyLogin(url, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    notif = (text, color) => {
        this.notification = {
            text: text,
            color: color,
        };
        this.emit('NOTIFICATION');
    };
    getNotif = () => {
        return this.notification;
    };
}

const webStore = new WebStore();
export default webStore;
