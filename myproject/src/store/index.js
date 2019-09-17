import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);


import common from "./common"
let store = new Vuex.Store({
    modules: {
        common,
    }
});
export default store;