import store from "../store";
import axios from "../../axios";

import { Toast } from "native-base";

export default {
    state: {
        favorites: [],
        cart: [],
    },
    getters: {
        getFavorites(state) {
            return state.favorites;
        },
        getCart(state) {
            return state.cart;
        },
    },
    mutations: {
        setDishToFavorites(state, payload) {
            state.favorites.push(payload);
        },
        removeDishFromFavorites(state, payload) {
            state.favorites.splice(state.favorites.indexOf(payload), 1);
        },
        clearFavorites(state) {
            state.favorites = [];
        },
        setDishToCart(state, payload) {
            state.cart.push(payload);
        },
        removeDishFromCart(state, payload) {
            state.cart.splice(state.cart.indexOf(payload), 1);
        },
        clearCart(state) {
            state.cart = [];
        },
    },
    actions: {
        likeDish(context, payload) {
            const dish_id = payload.dish_id;

            context.commit('setDishToFavorites', dish_id);

            Toast.show({
                text: "Добавлено в любимое",
                type: "success",
                duration: 3000
            });

            store.dispatch('updatePreloader', false);
        },
        dislikeDish(context, payload) {
            const dish_id = payload.dish_id;

            context.commit('removeDishFromFavorites', dish_id);

            Toast.show({
                text: "Удалено из любимых",
                type: "success",
                duration: 3000
            });

            store.dispatch('updatePreloader', false);
        },
        addDishToCart(context, payload) {
            const dish_id = payload.dish_id;

            context.commit('setDishToCart', dish_id);

            Toast.show({
                text: "Добавлено в корзину",
                type: "success",
                duration: 3000
            });

            store.dispatch('updatePreloader', false);
        },
        removeDishFromCart(context, payload) {
            const dish_id = payload.dish_id;

            context.commit('removeDishFromCart', dish_id);

            Toast.show({
                text: "Удалено из корзины",
                type: "success",
                duration: 3000
            });

            store.dispatch('updatePreloader', false);
        },
    }
}