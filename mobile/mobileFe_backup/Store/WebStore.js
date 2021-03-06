import { apiPost, verifyLogin, apiLogout, uploadToMicro } from './Helper';
import { AsyncStorage } from 'react-native';

import { link } from './SocketConnect';

class WebStore {
    constructor() {
        this.token = '';
        this.username = '';
        this.id = '';
    }
    setData = async (param, value) => {
        try {
            await AsyncStorage.setItem(param, value);
        } catch (error) {
            console.log(error);
        }
    };

    deleteData = async param => {
        try {
            const a = await AsyncStorage.removeItem(param);
            return a;
        } catch (err) {
            console.log(err);
        }
    };

    getToken = async () => {
        try {
            const a = await AsyncStorage.getItem('token');
            this.token = a;
            return a;
        } catch (error) {
            console.log(error);
        }

        return 'error';
    };

    getUsername = async () => {
        try {
            const a = await AsyncStorage.getItem('username');
            this.username = a;
            return a;
        } catch (error) {
            console.log(error);
        }

        return 'error';
    };

    getId = async () => {
        try {
            const a = await AsyncStorage.getItem('_id');
            this.id = a;
            return a;
        } catch (error) {
            console.log(erorr);
        }

        return 'error';
    };

    login = body => {
        const url = `${link}/api/login`;
        return new Promise(resolve => {
            apiPost(url, body, '', response => {
                resolve(response);
            });
        });
    };

    logout = () => {
        const url = `${link}/api/logout`;
        console.log(url);
        return new Promise(resolve => {
            this.getToken().then(token => {
                apiLogout(url, token, response => {
                    console.log(response);
                    resolve(response);
                });
            });
        });
    };

    register = body => {
        const url = `${link}/api/register`;
        return new Promise(resolve => {
            apiPost(url, body, '', response => {
                resolve(response);
            });
        });
    };

    checkRegis = () => {
        const url = `${link}/api/checkRegisBoard`;
        return this.getUsername().then(username => {
            var body = {
                username: username,
            };
            return new Promise(resolve => {
                apiPost(url, body, this.token, response => {
                    resolve(response);
                });
            });
        });
    };

    checkUser = () => {
        const url = `${link}/api/checkuser`;
        return new Promise(resolve => {
            this.getToken().then(token => {
                // console.log(token);
                verifyLogin(url, token, response => {
                    resolve(response);
                });
            });
        });
    };

    //Monitoring API Start

    getMonitorData = () => {
        const url = `${link}/api/getMonitoringData`;
        return this.getUsername().then(username => {
            const body = {
                username: username,
            };
            return this.getToken().then(token => {
                return new Promise(resolve => {
                    apiPost(url, body, token, response => {
                        resolve(response);
                    });
                });
            });
        });
    };

    // getAllMonitor = () => {
    //     const url = `${link}/api/getAllMonitorData`;
    //     return new Promise(resolve => {
    //         const body = {
    //             username: this.getUsername()
    //         }
    //         apiPost(url, body, this.getToken(), response => {
    //             resolve(response);
    //         })
    //     })
    // }

    getLastMonitorData = () => {
        const url = `${link}/api/getLastMonitorData`;
        return this.getUsername().then(username => {
            const body = {
                username: username,
            };
            return this.getToken().then(token => {
                return new Promise(resolve => {
                    apiPost(url, body, token, response => {
                        resolve(response);
                    });
                });
            });
        });
        // return new Promise(resolve => {
        //     const body = {
        //         username: this.getUsername()
        //     }
        //     apiPost(url, body, this.getToken(), response => {
        //         resolve(response);
        //     })
        // })
    };

    getStatusMonitoringData = () => {
        const url = `${link}/api/getStatusMonitoringData`;
        return this.getUsername().then(username => {
            const body = {
                username: username,
            };
            return this.getToken().then(token => {
                return new Promise(resolve => {
                    apiPost(url, body, token, response => {
                        resolve(response);
                    });
                });
            });
        });
        // return new Promise(resolve => {
        //     var body = {
        //         username: this.getUsername()
        //     }
        //     apiPost(url, body, this.getToken(), response => {
        //         resolve(response);
        //     })
        // })
    };

    updateStatusMonitoringData = val => {
        const url = `${link}/api/updateStatusMonitoringData`;
        return this.getUsername().then(username => {
            const body = {
                data: val,
                username: username,
            };
            return this.getToken().then(token => {
                return new Promise(resolve => {
                    apiPost(url, body, token, response => {
                        resolve(response);
                    });
                });
            });
        });
        // return new Promise(resolve => {
        //     var body = {
        //         data: val,
        //         username: this.getUsername()
        //     }
        //     apiPost(url, body, this.getToken(), response => {
        //         resolve(response);
        //     })
        // })
    };

    //Monitoring API End

    // Inisiasi untuk NodeMCU
    boardUpdate = data => {
        return this.getUsername().then(username => {
            var param = `?ssid=${data.ssid}&pwd=${
                data.pwd
            }&username=${username}`;
            console.log(param);
            return new Promise(resolve => {
                uploadToMicro(param, resp => {
                    console.log(resp);
                    resolve(resp);
                });
            });
        });
    };
    updateBoardPoint = () => {
        const url = `${link}/api/updateBoardPoint`;
        return this.getUsername().then(username => {
            const body = {
                username: username,
            };
            return this.getToken().then(token => {
                // console.log(token, body);
                return new Promise(resolve => {
                    apiPost(url, body, token, response => {
                        console.log(response);
                        resolve(response);
                    });
                });
            });
        });
    };
}

const web = new WebStore();
export default web;
