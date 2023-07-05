import Vue from 'vue'
import $dialog from './$dialog.vue';
import { isEmpty } from '@/utils/common'

let DialogConstructor = Vue.extend($dialog)
let instance
let dialog = (options = {}) => {
	instance = new DialogConstructor({
		data: options
	})
	document.body.appendChild(instance.$mount().$el)
}

['alert', 'confirm', 'close', 'prompt'].forEach(type => {
	dialog[type] = options => {
		if (type !== 'close') {
			options.type = type;
			options.isShow = true
			return new Promise((resolve, reject) => {
				dialog(Object.assign(options, {
					confirm: () => {
						if (type === 'prompt') {
							if (options.required && isEmpty(options.value)) {
								options.isError = true
								return
							}
							if (options.validFnc && typeof options.validFnc === 'function' && !options.validFnc(options.value)) {
								options.isError = true
								return
							}
							resolve(options.value)
						} else {
							resolve()
						}
						// resolve(options.value)
					},
					cancel: () => {
						options.isShow = false
						reject()
					}
				}))
			})
		} else {
			instance.handleClosed()
		}
	}
})
export default dialog