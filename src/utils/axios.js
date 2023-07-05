/**
 * @author sudong.duan
 * Date: 21-12-16
 * desc: axios请求方法
 */

import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import { isEmpty } from './common'
//import { removeAccountInfoStorage, removeTokenStorage } from './storage'



let baseUrl = '/api/xicha'  //'/fcapi'
// const protocol = window.location.protocol ? window.location.protocol : 'http:'
// if (process.env.NODE_ENV === 'development') {
//     baseUrl = `${protocol}//op.cn88555.com/fcapi`
// } else if (process.env.NODE_ENV === 'pre') {
//     baseUrl = `${protocol}//xicloud.cn88555.com/fcapi`
// } else if (process.env.NODE_ENV === 'production') {
//     baseUrl = `${protocol}//api-live-prod.medlander.com`
// } else {
// 	baseUrl = `${protocol}//api-live-test.medlander.com`
// }

const responseCode = {
	/**
	 * 请求成功
	 */
	success: 200,
	/**
	 * 成功code2
	 */
	success2: 0,
	/**
	 * token失效
	 */
	tokenFailure: 201
}


//请求前拦截
axios.interceptors.request.use(
	(config) => {
		if (config.url.indexOf('http://') === -1 && config.url.indexOf('https://') === -1) {
			if (config.baseUrl) {
				config.url = config.baseUrl + config.url
			} else {
				config.url = baseUrl + config.url
			}
		}
		const token = localStorage.getItem('token');
		if (token && config.url !== "https://restapi.amap.com/v3/geocode/regeo") {
			const headers = config.headers;
			headers.Authorization = `${token}`;
		}
		// config.transformResponse = [(data) => {
		// 	console.log('data', data)
		// 	return JSON.parse(data)
		// }]
		return config
	},
	(error) => {
		return error
	}
)

//请求返回拦截
axios.interceptors.response.use(
	(response) => {
		try {
			if (response) {
				const result = response
				return result
			}
		} catch (err) {
			//window.$message.error(err)
			return {}
		}
	},
	(error) => {
		if (error.response) {
			return error.response
		} else {
			return error
		}
	}
)

export const requestApi = (params) => {
	return new Promise((resolve, reject) => {
		params.method = params.method || 'POST'
		new Promise((res, rej) => {
			if (params.method === 'POST') {
				axios.post(params.url, params.data, { headers: Object.assign({ "Content-Type": "application/json" }, params.headers || {}), baseUrl: params.baseUrl }).then((responseData) => {
					res(responseData)
				}).catch((errData) => {
					rej(errData)
				})
			} else if (params.method === 'GET') {
				axios.get(params.url, { params: params.data, responseType: params.responseType, headers: params.headers, baseUrl: params.baseUrl }).then((responseData) => {
					res(responseData)
				}).catch((errData) => {
					rej(errData)
				})
			}
		}).then((res) => {
			if (res.status !== 200) {
				Toast('网络请求失败，请稍后再试')
				reject(res.data)
				return
			}
			if (isEmpty(res) || isEmpty(res.data)) {
				reject(res.data)
				Toast('网络请求失败，请稍后再试')
				return
			}
			if (params.notCheck) {
				resolve(res.data)
				return
			}

			if (res.data.code === responseCode.success || res.data.code === responseCode.success2) {
				resolve(res.data)
			} else if (res.data.code === responseCode.tokenFailure) {
				Toast(res.data.message || res.data.msg)
				reject(res.data)
				//window.location.href = '/'
			} else {
				if (params.isDefault) {

				}
				if (!params.hideNote) {
					Toast(res.data.message || res.data.msg)
				}
				reject(res.data)
			}
		}).catch((err) => {
			reject(err)
		})
		// axios.post(params.url, params.data, { headers: Object.assign({ "Content-Type": "application/json" }, params.headers || {}) })
		// 	.then((res) => {

		// 	})
	})
}

 //export { axios }