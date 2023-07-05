/**
 * @author sudong.duan
 * Date: 21-12-16
 * desc: 公共方法
 */

import { requestApi } from './axios'


/**
 *判断是否为空
 *@param {String}a 变量
 *@return 是否为空
 */
const isEmpty = function (a) {
	if (a === undefined || a === 'undefined' || a === null || a === 'null' || a === '' || JSON.stringify(a) === '{}' || JSON.stringify(a) === '[]') {
		return true
	}
	return false
}


/**
	判断是否微信环境
	@param 
	@return { Boolean } 是否微信环境
*/
function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

/**
 节流函数
 @param {Function} callback 回调函数
 @return
 */
const throttleFnc = function (callback) {
	let isLimit = false
	return function () {
		if (!isLimit) {
			isLimit = true
			callback.call(this, function () {
				isLimit = false
			}, ...arguments)
		}
	}
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 @return
 */
function debounce(func, wait, immediate) {
	let timer;
	return function () {
		let context = this,
			args = arguments;

		if (timer) clearTimeout(timer);
		if (immediate) {
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timer = setTimeout(() => {
				func.apply(context, args)
			}, wait)
		}
	}
}

/**
 获取浏览器环境
 @param 
 @return { String } 浏览器环境
 */
const getENV = () => {
	const ua = navigator.userAgent.toLowerCase();
	const isWeixin = ua.indexOf('micromessenger') !== -1;
	const isInApp = /(^|;\s)app\//.test(ua);
	if (isWeixin) {
		if (window.__wxjs_environment === 'miniprogram') {
			return 'wxapp';
		} else {
			return 'wxh5';
		}
	} else {
		if (!isInApp) {
			return 'browser';
		} else {
			if (ua.match(/(iphone|ipod|ipad);?/i)) {
				return 'ios'
			}
			if (ua.match(/android|adr/i)) {
				return 'android'
			}
			return 'browser'
		}
	}
}

/**
	获取requestClient
	@param 
	@return {String} requestClient
*/
const getRequestClient = () => {
	const env = getENV()
	switch (env) {
		case 'wxapp':
			return 1
		default:
			return 1
	}
}

/**
	过滤填空题数据
	@param {String} text 待处理的填空题数据
	@return {String} 已处理的填空题数据
*/
const filterFillBlankText = (text) => {
	return text.split('').map((char, charIndex) => {
		if (charIndex > 0 && char === '_' && text[charIndex - 1] === '_') {
			return ''
		} else {
			return char
		}
	}).join('').replace(/_/g, '@@@###@@@')
}


/**
	获取链接参数
	@param {String} link 链接
	@return {String} 链接后参数数据
*/
const getLinkQuery = (link) => {
	var queryString = link.split('?')[1];
	if (queryString) {
		const queryData = {}
		queryString = queryString.split('&');
		for (var item of queryString) {
			item = item.split('=');
			queryData[item[0]] = item[1];
		}
		return queryData
	} else {
		return {}
	}
}

/**
	根据经纬度获取地址
	@param {String} longitude 经度
	@param {String} latitude 纬度
	@return {String} 地址数据
*/
const getRegeoFromTude = (longitude, latitude) => {
	return new Promise((resolve, reject) => {
		requestApi({
			url: 'https://restapi.amap.com/v3/geocode/regeo',
			method: "GET",
			data: {
				key: 'f751aff38707f53f57b61405db8abf0a',
				location: `${longitude},${latitude}`,
				radius: 50
			},
			notCheck: true
		}).then((locationData) => {
			resolve(locationData.regeocode.formatted_address)
		}).catch(() => {
			reject()
		})
	})
}




export {
	isEmpty,
	is_weixin,
	throttleFnc,
	debounce,
	getENV,
	getRequestClient,
	filterFillBlankText,
	getLinkQuery,
	getRegeoFromTude
}