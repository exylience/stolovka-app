import store from "../store";
import axios from "../../axios";
import { Toast } from "native-base";

export default {
    state: {
        user_orders: []
    },
    getters: {
        getUserOrders(state) {
            return state.user_orders;
        }
    },
    mutations: {
        setUserOrders(state, payload) {
            state.user_orders = payload;
        },
        removeOrder(state, payload) {
            state.user_orders.forEach((order, index) => {
                if (order.id === payload) state.user_orders.splice(index, 1);
            })
        }
    },
    actions: {
        storeOrder(context, payload) {
            const data = payload.data;

            axios.post('order', data, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => {
                    if (res.data.status) {
                        const data = res.data;

                        payload.navigation.navigate('Orders');
                        store.commit('clearCart');

                        Toast.show({
                            text: "Заказ успешно оформлен. Ожидайте обработки",
                            type: "success",
                            duration: 3000
                        });
                    }

                    store.dispatch('updatePreloader', false);
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
        },
        loadUserOrders(context) {
            axios.get(`user/orders`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => { // успешное получение списка потоков
                    if (res.data.status) {
                        context.commit('setUserOrders', res.data.orders); // заносим список услуг в state
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
        deleteOrder(context, payload) {
            const order_id = payload.order_id;

            axios.delete(`user/order/${order_id}`, {
                headers: {
                    "Authorization": `Bearer ${store.getters.getToken}`
                }
            })
                .then(res => {
                    if (res.data.status) {
                        context.commit('removeOrder', order_id);

                        payload.navigation.navigate('UserOrders');

                        Toast.show({
                            text: "Подписка успешно отменена",
                            type: "success",
                            duration: 3000
                        });
                    }

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => {
                    const data = err.response.data;

                    if (!data.status) {
                        if (data.code === 202) { // validation error
                            context.commit('responseUpdate', data);

                            Toast.show({
                                text: "Проверьте правильность введенных полей",
                                buttonText: "Закрыть",
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