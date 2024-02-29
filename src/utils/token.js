const TOKEN_KEY = "loginUser"

function setToken(value) {
    localStorage.setItem(TOKEN_KEY, value)
}

function getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export {
    setToken,
    getToken,
    removeToken
}