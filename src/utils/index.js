import {setToken, getToken, removeToken} from "@/utils/token";
import {NOT_LOGIN, AUTH_USER, AUTH_ADMIN, checkAccess} from "@/utils/permission";
import request from "@/utils/request";

export {
    NOT_LOGIN,
    AUTH_USER,
    AUTH_ADMIN
}

export {
    request
}

export {
    setToken,
    getToken,
    removeToken,
    checkAccess
}