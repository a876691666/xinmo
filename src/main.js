// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
//import VueQuillEditor from 'vue-quill-editor';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import "../static/css/commdetail/commdetail.css";
import {postFetch, getFetch} from './common/js/fetch';
import $ from 'jquery';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
Vue.prototype.postFetch = postFetch;
Vue.prototype.getFetch = getFetch;
Vue.config.productionTip = false;
Vue.use(ElementUI);


VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'f8efad4c5f3595ad1a422956341e1d27',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
//Vue.use(VueQuillEditor);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
