const NOT_LOGIN = 0
const AUTH_USER = 1
const AUTH_ADMIN = 2

function checkAccess(loginUser, auth) {
    if (auth === NOT_LOGIN) {
        return true
    }
    return loginUser && loginUser.role >= auth
}

export {
    NOT_LOGIN,
    AUTH_USER,
    AUTH_ADMIN
}

export {
    checkAccess
}