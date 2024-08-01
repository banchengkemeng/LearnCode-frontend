import {getToken} from "@/utils/token";

const NOT_LOGIN = "not_login"
const AUTH_USER = "user"
const AUTH_ADMIN = "admin"

const roleMap = (() => {
    return JSON.parse(`{
        "${NOT_LOGIN}": ["${NOT_LOGIN}", "${AUTH_USER}", "${AUTH_ADMIN}", null],
        "${AUTH_USER}": ["${AUTH_USER}", "${AUTH_ADMIN}"],
        "${AUTH_ADMIN}": ["${AUTH_ADMIN}"]
    }`)
})()

function checkAccess(auth) {
    const loginUser = getToken()
    if (auth === NOT_LOGIN) {
        return true
    }

    return loginUser?.userRole != null &&  roleMap[auth]?.includes(loginUser.userRole)
}

export {
    NOT_LOGIN,
    AUTH_USER,
    AUTH_ADMIN
}

export {
    checkAccess
}