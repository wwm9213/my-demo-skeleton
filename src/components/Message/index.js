/*
 * @Date: 2021-05-06 16:07:39
 * @Author: wwm
 * @LastEditTime: 2021-05-06 16:16:11
 * @LastEditors: wwm
 * @Description: 使用vue.extend封装组件
 */
import Message from './index.vue'

export default {
    install(Vue) {
        const Toast = Vue.extend(Message)
        const toast = new Toast()
        toast.$mount(document.createElement('div'))
        document.body.appendChild(toast.$el)
        Vue.prototype.$toast = toast
    }
}
