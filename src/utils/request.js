import axios from "axios";
import {Message} from "@arco-design/web-react";

const request = axios.create({
    baseURL: 'http://localhost:8101/api',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('request success result: ', response)
    // 发生业务错误时(code非0)
    const code = response.data.code
    if (code !== 0) {
        Message.error({
            content: response.data.message,
            duration: 1000
        })
        if (code === 40100) {
            window.location = '#/user/login'
            window.location.reload()
        }
    } else {
        // Message.success({
        //     content: response.data.message,
        //     duration: 700
        // })
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error({
        content: error.message,
        duration: 1000
    })
    return Promise.reject(error);
});


export default request