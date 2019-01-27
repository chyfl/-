import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
		console.log(to) // to：要进入的目标路由对象，到哪里去
		console.log(from) // from：离开的路由对象，哪里来
		console.log(savedPosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {//如果keepAlive的话，保存停留的位置：
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

