import store from "../store";
import axios from "../../axios";

import { Toast } from "native-base";

export default {
    state: {
        groups: [],
        user_posts: []
    },
    getters: {
        getUserPosts(state) {
            return state.user_posts;
        }
    },
    mutations: {
        setUserPosts(state, payload) {
            state.user_posts = payload;
        },
        addLike(state, payload) {

        },
        removeLike(state, payload) {

        },
        addDislike(state, payload) {

        },
        removeDislike(state, payload) {
            
        }
    },
    actions: {
        loadUserPosts(context) {
            axios.get(`user/posts`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => { // успешное получение списка потоков
                    if (res.data.status) {
                        context.commit('setUserPosts', res.data.posts); // заносим список услуг в state
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
        slapLike(context, payload) {
            const data = payload.data;

            axios.post('post/like', data, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => {
                    if (res.data.status) {
                        context.commit('addLike');
                    }
                })
                .catch(err => {
                    const data = err.response.data;
                    console.log(data)

                    if (!data.status) {
                        if (data.code === 202) { // validation error
                            context.commit('responseUpdate', data);

                            Toast.show({
                                text: "Проверьте правильность введенных полей",
                                type: "danger",
                                duration: 3000
                            });
                        }
                    }

                    store.dispatch('updatePreloader', false);
                })
        }
    }
}