import store from "../store";
import axios from "../../axios";

import { Toast } from "native-base";

export default {
    state: {
        dishes: [],
        active_dish: false,
        dishSearchQuery: '',
        categories: []
    },
    getters: {
        getDishes(state) {
            return state.dishes;
        },
        getActiveDish(state) {
            return state.active_dish;
        },
        getFilteredDishes(state) {
            return state.dishes.filter((dish) => {
                return dish.title.toLowerCase().includes(state.dishSearchQuery.toLowerCase()) ||
                    dish.desc.toLowerCase().includes(state.dishSearchQuery.toLowerCase())
            })
        },
        getDishSearchQuery(state) {
            return state.dishSearchQuery;
        },
        getCategoriesAndDishes(state) {
            return state.categories
        }
    },
    mutations: {
        setDishes(state, payload) {
            state.dishes = payload;
        },
        setActiveDish(state, payload) {
            state.active_dish = payload;
        },
        setReview(state, payload) {
            state.active_dish.reviews.push(payload);
        },
        setCategoriesAndDishes(state, payload) {
            state.categories = payload;
        },
        setSearchQuery(state, payload) {
            state.dishSearchQuery = payload;
        }
    },
    actions: {
        loadDishes(context) {
            axios.get(`dish`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => { // успешное получение списка потоков
                    if (res.data.status) {
                        context.commit('setDishes', res.data.dishes); // заносим список блюд в state
                    }

                    console.log(res.data)

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => { // ответ с ошибкой
                    const data = err.response.data;
                    if (data.code === 428) { // проблемы с токеном
                        store.commit('logoutLocal');
                    }

                    Toast.show({
                        text: "Произошла ошибка при загрузке",
                        type: "danger",
                        duration: 3000
                    });

                    store.dispatch('updatePreloader', false);
                })
        },
        loadCategoriesAndDishes(context, payload) {
            axios.get(`category`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => { // успешное получение списка
                    if (res.data.status) {
                        context.commit('setCategoriesAndDishes', res.data.categories); // заносим список услуг в state
                    }

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => { // ответ с ошибкой
                    const data = err.response.data;
                    console.log(data)

                    if (data.code === 403) { // проблемы с токеном
                        store.dispatch('logout');
                    }

                    Toast.show({
                        text: "Произошла ошибка при загрузке",
                        type: "danger",
                        duration: 3000
                    });

                    store.dispatch('updatePreloader', false);
                })
        },
        loadDish(context, payload) {
            const dish_id = payload.dish_id;

            axios.get(`dish/${dish_id}`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => { // успешное получение списка потоков
                    if (res.data.status) {
                        context.commit('setActiveDish', res.data.dish); // заносим список услуг в state
                    }

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => { // ответ с ошибкой
                    const data = err.response.data;
                    if (data.code === 428) { // проблемы с токеном
                        store.commit('logoutLocal');
                    }

                    Toast.show({
                        text: "Произошла ошибка при загрузке",
                        type: "danger",
                        duration: 3000
                    });

                    store.dispatch('updatePreloader', false);
                })
        },
        searchDishes(context, payload) {
            context.commit('setSearchQuery', payload);
        }
    }
}