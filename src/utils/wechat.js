import { requestApi } from './axios'
import { is_weixin } from './common'
import wx from "weixin-js-sdk";
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

/**
	获取微信签名数据
	@param { Array } jsApiList 使用的jsApi列表
	@return {Object} 微信验签数据
*/
const getWeChatSignData = (jsApiList) => {
	if (!is_weixin() && false) {
		Vue.prototype.$toast('请使用微信打开')
		return
	}
	return new Promise((resolve, reject) => {
		requestApi({
			url: 'fcapi/wx/js-ticket',
			data: {
				// hash路由需要将#号后面的链接去掉
				url: window.location.href.split('#')[0]
			},
			method: 'GET',
			baseUrl: '/',
			notCheck: true,
			notToken: true,
		}).then((responseData) => {
			wx.config({
				// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				debug: false,
				// 必填，公众号的唯一标识
				appId: responseData.appId,
				// 必填，生成签名的时间戳
				timestamp: responseData.timestamp,
				// 必填，生成签名的随机串
				nonceStr: responseData.nonceStr,
				// 必填，签名，见附录1
				signature: responseData.signature,
				// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				jsApiList: jsApiList
			})
			wx.ready(() => {
				resolve()
			});
			wx.error(function (err) {
				reject(err)
			});
		}).catch((err) => {
			reject(err)
		})
	})
}

/**
	获取微信扫码结果
	@param 
	@return {String} 微信扫码结果
*/
const getWeChatQrcode = () => {
	return new Promise((resolve, reject) => {

		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: (qrcode) => {
				resolve(qrcode)
			},
			fail: (err) => {
				reject(err)
			},
		})
	})
}

/**
	使用微信内置地图查看位置接口
	@param 
	@return
*/
const openLocation = () => {
	return new Promise((resolve, reject) => {
		wx.openLocation({
			latitude: 0, // 纬度，浮点数，范围为90 ~ -90
			longitude: 0, // 经度，浮点数，范围为180 ~ -180。
			name: '', // 位置名
			address: '', // 地址详情说明
			scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
			infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
		  });
	})
}

/**
	获取地理位置
	@param 
	@return
*/
const getLocation = () => {
	return new Promise((resolve, reject) => {
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				resolve(res)
			},
			fail: function (err) {
				reject(err)
				Toast('位置信息获取失败，请检查微信权限')
			},
			cancel: function (err) {
				Toast('已拒绝获取位置权限')
				reject(err)
			}
		});
	})
}




export {
	getWeChatSignData,
	getWeChatQrcode,
	getLocation,
	openLocation
}