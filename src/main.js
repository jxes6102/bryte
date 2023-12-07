import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/none.css'
import '@/assets/css/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTW from 'element-plus/dist/locale/zh-tw.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/assets/css/index.css'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhTW,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.directive('tobottom', {
    mounted(el) {
        const target = {
            top: el.scrollHeight - 100,
            left: 0,
            behavior: 'smooth',
        }
        // console.log(target)
        // console.log(el.scrollHeight)
        document.querySelector('#main').scrollTo(target)
    }
})

app.use(store).use(router).use(CKEditor).mount('#app')

