import { EventEmitter } from 'events';

import { apiPost, verifyLogin, apiLogout } from './Helper';

const link = 'http://mohammedwazier.ddns.net/';
// process.env.NODE_ENV === 'production'
// ? 'https://mohammedwazier.ddns.net/'
// : '/';

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

    clearLocalStorage() {
        localStorage.clear();
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

    logout = () => {
        const url = `${link}api/logout`;
        return new Promise(resolve => {
            apiLogout(url, this.getToken(), response => {
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
            username: this.getUsername(),
        };
        return new Promise(resolve => {
            apiPost(url, body, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    getMonitorData = () => {
        const url = `${link}api/getMonitoringData`;
        return new Promise(resolve => {
            const body = {
                username: this.getUsername(),
            };
            apiPost(url, body, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    getAllMonitor = () => {
        const url = `${link}api/getAllMonitorData`;
        return new Promise(resolve => {
            const body = {
                username: this.getUsername(),
            };
            apiPost(url, body, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    getLastMonitorData = () => {
        const url = `${link}api/getLastMonitorData`;
        return new Promise(resolve => {
            const body = {
                username: this.getUsername(),
            };
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

    getStatusMonitoringData = () => {
        const url = `${link}api/getStatusMonitoringData`;
        return new Promise(resolve => {
            var body = {
                username: this.getUsername(),
            };
            apiPost(url, body, this.getToken(), response => {
                resolve(response);
            });
        });
    };

    updateStatusMonitoringData = val => {
        const url = `${link}api/updateStatusMonitoringData`;
        return new Promise(resolve => {
            var body = {
                data: val,
                username: this.getUsername(),
            };
            apiPost(url, body, this.getToken(), response => {
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

    remove = socket => {
        socket.disconnect();
        // this.removeListener();
    };
}

const webStore = new WebStore();
export default webStore;
