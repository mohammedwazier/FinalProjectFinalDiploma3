function checkStatus(response) {
  try {
    // if (response.status >= 200 && response.status < 300) {
    // 	if (response === false || response === 'authentication failed') {
    // 		localStorage.clear();
    // 		return 'authentication failed';
    // 	} else {
    return response.json();
    // 	}
    // } else if (response.status === 400) {
    // 	localStorage.clear();
    // 	return 'authentication failed';
    // } else {
    // 	return response;
    // }
  } catch (err) {
    console.log(err);
  }
}

export function apiGet(url, jwt, callback) {
  const bearer = `Bearer ${jwt}`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json"
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

export function apiPost(url, body, jwt, callback) {
  const bearer = `Bearer ${jwt}`;
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(responseData => {
      callback(responseData);
    })
    .catch(err => {
      console.log(err);
    });
}
