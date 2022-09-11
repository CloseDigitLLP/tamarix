import axios from 'axios'
import { baseURL } from '../configs/urls'

export default class Api {
    url = ''
    method = 'get'
    body = {}
    headers = {}

    constructor(method, url, body, headers) {
        this.url = url
        this.body = body
        this.headers = headers
        this.method = method
        return this.call()
    }

    call() {
        return axios({
            url: this.url,
            data: this.body,
            headers: this.headers,
            baseURL,
            method: this.method
        })
    }
}