// 提交题目相关接口
import {request} from "@/utils";

const submitAPI = {
    submitAPI: '/submit/add',
    getSubmitRecordAPI: '/submit/get',
    getSubmitRecordListAPI: '/submit/list',
}

/**
 * 提交题目
 */
export function submitQuestion(data) {
    return request({
        url: submitAPI.submitAPI,
        method: "POST",
        data
    })
}

/**
 * 获取提交记录
 */
export function getSubmitRecord(data) {
    return request({
        url: submitAPI.getSubmitRecordAPI,
        method: "GET",
        params: data
    })
}


/**
 * 获取提交记录列表
 */
export function getSubmitRecordList(data) {
    return request({
        url: submitAPI.getSubmitRecordListAPI,
        method: "POST",
        data: data || {}
    })
}

