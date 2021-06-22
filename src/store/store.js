import Vue from 'vue-native-core';
import Vuex from 'vuex';

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import auth from "./modules/auth";
import dishes from "./modules/dishes";
import groups from "./modules/groups";
import reviews from "./modules/reviews";
import user from "./modules/user";
import orders from "./modules/orders";
import posts from "./modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        auth,
        dishes,
        groups,
        reviews,
        user,
        orders,
        posts
    },
});