// 题目相关接口
import {request} from "@/utils";

const questionAPI = {
    addQuestionAPI: '/question/admin/add',
    editQuestionAPI: '/question/admin/update',
    getQuestionListAPI: '/question/list',
    getQuestionAdminListAPI: '/question/admin/list',
    getQuestionAPI: '/question/get',
    getQuestionAdminAPI: '/question/admin/get',
    deleteQuestionsAPI: '/question/admin/delete',
    getLangListAPI: '/question/lang/list',
}

/**
 * 创建题目
 */
export function addQuestion(data) {
    return request({
        url: questionAPI.addQuestionAPI,
        method: "POST",
        data
    })
}

/**
 * 编辑题目
 */
export function editQuestion(data) {
    return request({
        url: questionAPI.editQuestionAPI,
        method: "POST",
        data
    })
}


/**
 * 获取题目列表
 */
export function getQuestionList(data) {
    return request({
        url: questionAPI.getQuestionListAPI,
        method: "POST",
        data: data || {}
    })
}

/**
 * 管理员获取题目列表
 */
export function getQuestionAdminList(data) {
    return request({
        url: questionAPI.getQuestionAdminListAPI,
        method: "POST",
        data: data || {}
    })
}

/**
 * 获取题目
 */
export function getQuestion(id) {
    return request({
        url: questionAPI.getQuestionAPI,
        method: 'GET',
        params: {
            id : id
        }
    })
}

/**
 * 管理员获取题目
 */
export function getQuestionAdmin(id) {
    return request({
        url: questionAPI.getQuestionAdminAPI,
        method: 'GET',
        params: {
            id : id
        }
    })
}

/**
 * 管理员删除题目
 */
export function deleteQuestionAdmin(ids) {
    return request({
        url: questionAPI.deleteQuestionsAPI,
        method: 'POST',
        data: ids
    })
}

/**
 * 获取编程语言枚举
 */
export function getLangList() {
    return request({
        url: questionAPI.getLangListAPI,
        method: 'GET'
    })
}

/**
 *
 */
