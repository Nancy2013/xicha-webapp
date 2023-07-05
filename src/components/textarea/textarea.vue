<template>
    <div :class="`textarea ${isError ? 'formItem-error' : ''} textarea-padding-${className}`">
        <div class="formItem-label">
			<!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
            <div>{{ label }}</div>
			<span v-if="required">*</span>
        </div>
		<div :class="`textarea-content textarea-padding-${className}`">
			<textarea :readonly="disabled" v-model="componentValue" :placeholder="placeholder" @focus="isError = false" @input="handleInput"></textarea>
		</div>
    </div>
</template>

<script>

export default {
    name: 'fcTextarea',

    components: {},
    props: {
		className: {
			type: String,
			default: ''
		},
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        value: {
            type: String | Number,
            default: ''
		},
		disabled: {
			type: Boolean,
            default: false
		}
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
		return {
			componentValue: '',
			isError: false
		}
	},

	created() {
		this.componentValue = this.value
	},

	methods: {
		/**
            处理输入框输入事件
            @param 
            @return
        */
        handleInput(event) {
			let value = event.target.value
			this.componentValue = value
			this.$emit('change', value)
		}
	},
	watch: {
		value(newValue) {
			this.componentValue = newValue
		}
	}

}

</script>

<style scoped lang='scss'>
.textarea-padding-no {
	padding-top: 0 !important;
	textarea {
		height: 1.5rem !important;
	}
}
.textarea {
	width: 100%;
	padding: 0.28rem 0 0.3rem;
	border-bottom: 1px solid #eeeeee;
	transition: all .15s;
	.textarea-content {
		padding-top: 0.2rem;
		textarea {
			width: 100%;
			height: 1.22rem;
			padding: 0.2rem;
			//font-size: 0.28rem;
			border: none;
			border-radius: 0.04rem;
			outline: none;
			background-color: #F5F5F5;
			color: #191919;
			resize: none;
			transition: all .15s;
		}
	}
}
</style>