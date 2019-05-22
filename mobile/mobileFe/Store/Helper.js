function checkStatus(response) {
    try {
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function apiGet(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
        },
    })
        .then(checkStatus)
        .then(responseData => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
}

export async function apiPost(url, body, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(checkStatus)
        .then(responseData => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
}

export async function verifyLogin(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
        },
    })
        .then(checkStatus)
        .then(responseData => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
}

export async function apiLogout(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
        },
    })
        .then(checkStatus)
        .then(responseData => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
}


export async function uploadToMicro(param, callback) {
    fetch('http://192.168.1.1/setup'+param, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus)
        .then(responseData => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
}