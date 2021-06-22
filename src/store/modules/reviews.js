import store from "../store";
import axios from "../../axios";

import { Toast } from "native-base";

export default {
    state: {

    },
    getters: {

    },
    mutations: {
        setDishes(state, payload) {
            state.dishes = payload;
        },
    },
    actions: {
        storeReview(context, payload) {
            const data = payload.data;

            axios.post('review', data, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => {
                    if (res.data.status) {
                        context.commit('responseClear');

                        store.dispatch('loadDish', {
                            dish_id: data.dish_id
                        });

                        Toast.show({
                            text: "Отзыв успешно отправлен, спасибо!",
                            type: "success",
                            duration: 3000
                        });
                    }

                })
                .catch(err => {
                    const data = err.response.data;
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

        },
    }
}