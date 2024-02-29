// 用户相关请求

import request from "@/utils/request";

const userAPI = {
    loginAPI: '/user/login'
}

/**
 * 用户登录
 */
export function login(data) {
    return request({
        url: userAPI.loginAPI,
        method: 'POST',
        data
    })
}