//
import { message } from 'antd'
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const service = axios.create({
    baseURL: isDev ? 'https://cnodejs.org/api/v1' : 'xxx',
})

service.interceptors.request.use((config) => {
    console.log('请求的操作', config);
    return config;
})
service.interceptors.response.use((response) => {

    if (response.status === 200) {
        return response.data;
    } else {
        message.error('系统繁忙，请稍后再试...');

    }
})

const getTopics = (page = 1, limit = 5) => {
    return service.get(`/topics?page=${page}&limit=${limit}`)
}

const getOneArticle = (aid) => {
    return service.get(`/topic/${aid}`)
}

export {
    getTopics,
    getOneArticle
}