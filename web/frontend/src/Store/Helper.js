function checkStatus(response) {
    try {
        console.log(response);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export function apiGet(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
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

export function apiPost(url, body, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
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

export function verifyLogin(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
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

export function apiLogout(url, jwt, callback) {
    const bearer = `Bearer ${jwt}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
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
