/**
 * 茶农端tab的缓存数据
 */
const staffTabStorage = {
	/**
	 存储茶农tabIndex
	 @param { Number } index 茶农tab的下标
	 @return
	 */
	setTabIndex(index) {
		localStorage.setItem('staffTabIndex', index)
	},

	/**
	 获取茶农tabIndex
	 @param
	 @return { Number } 茶农tab的下标
	 */
	getTabIndex() {
		return localStorage.getItem('staffTabIndex')
	},

	/**
	 删除茶农tabIndex数据
	 @param
	 @return
	 */
	removeTabIndex() {
		localStorage.removeItem('staffTabIndex')
	}
}

/**
 * 茶农端tab的缓存数据
 */
const staffUserDatatorage = {
	/**
	 存储茶农用户数据
	 @param { Object } userData 茶农的用户数据
	 @return
	 */
	setUserData(userData) {
		localStorage.setItem('staffUserData', JSON.stringify(userData))
	},

	/**
	 获取茶农用户数据
	 @param
	 @return { Object } 茶农的用户数据
	 */
	getUserData() {
		if (localStorage.getItem('staffUserData')) {
			return JSON.parse(localStorage.getItem('staffUserData'))
		} else {
			return {}
		}
	},

	/**
	 删除茶农用户数据
	 @param
	 @return
	 */
	removeUserData() {
		localStorage.removeItem('staffUserData')
	},
}

/**
 * 茶农端tab的缓存数据
 */
const userDatatorage = {
	/**
	 存储茶农用户数据
	 @param { Object } userData 茶农的用户数据
	 @return
	 */
	setUserData(userData) {
		localStorage.setItem('userData', JSON.stringify(userData))
	},

	/**
	 获取茶农用户数据
	 @param
	 @return { Object } 茶农的用户数据
	 */
	getUserData() {
		if (localStorage.getItem('userData')) {
			return JSON.parse(localStorage.getItem('userData'))
		} else {
			return {}
		}
	},

	/**
	 删除茶农用户数据
	 @param
	 @return
	 */
	removeUserData() {
		localStorage.removeItem('userData')
	},
}

/**
 * 企业端tab的缓存数据
 */
const enterpriseTabStorage = {
	/**
	 存储企业tabIndex
	 @param { Number } index 茶农tab的下标
	 @return
	 */
	setTabIndex(index) {
		localStorage.setItem('enterpriseTabIndex', index)
	},

	/**
	 获取企业tabIndex
	 @param
	 @return { Number } 茶农tab的下标
	 */
	getTabIndex() {
		return localStorage.getItem('enterpriseTabIndex')
	},

	/**
	 删除企业tabIndex数据
	 @param
	 @return
	 */
	removeTabIndex() {
		localStorage.removeItem('enterpriseTabIndex')
	}
}

/**
 * 缓存企业数据
 */
const enterpriseUserDataStorage = {
	/**
	 存储企业用户信息
	 @param { Object } userData 企业用户信息
	 @return
	 */
	setUserData(userData) {
		localStorage.setItem('enterpriseUserData', JSON.stringify(userData))
	},

	/**
	 获取企业用户信息
	 @param
	 @return { Object } 企业用户信息
	 */
	getUserData() {
		const userDataStr = localStorage.getItem('enterpriseUserData')
		if (userDataStr) {
			return JSON.parse(userDataStr)
		} else {
			return {}
		}
	},

	/**
	 删除企业用户信息
	 @param
	 @return
	 */
	removeUserData() {
		localStorage.removeItem('enterpriseUserData')
	}
}

/**
 * 农事列表菜单tab的缓存数据
 */
const agriculturalTabStorage = {
	/**
	 存储农事列表tabIndex
	 @param { Number } index 农事列表tab的下标
	 @return
	 */
	setTabIndex(index) {
		localStorage.setItem('agriculturalTabIndex', index)
	},

	/**
	 获取农事列表tabIndex
	 @param
	 @return { Number } 农事列表tab的下标
	 */
	getTabIndex() {
		return localStorage.getItem('agriculturalTabIndex')
	},

	/**
	 删除农事列表tabIndex数据
	 @param
	 @return
	 */
	removeTabIndex() {
		localStorage.removeItem('agriculturalTabIndex')
	}
}

/**
 * 用户账号的缓存数据
 */
const userPhoneStorage = {
	/**
	 存储用户账号
	 @param { String } phone 用户账号手机号
	 @return
	 */
	setUserPhone(phone) {
		localStorage.setItem('userPhone', phone)
	},

	/**
	 获取用户账号
	 @param
	 @return { String } 用户账号手机号
	 */
	getUserPhone() {
		return localStorage.getItem('userPhone') || ""
	},

	/**
	 删除用户账号数据
	 @param
	 @return
	 */
	removeUserPhone() {
		localStorage.removeItem('userPhone')
	}
}




export {
	staffTabStorage,
	staffUserDatatorage,
	enterpriseTabStorage,
	enterpriseUserDataStorage,
	agriculturalTabStorage,
	userPhoneStorage,
	userDatatorage
}