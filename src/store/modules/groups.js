import store from "../store";
import axios from "../../axios";

import { Toast } from "native-base";

export default {
    state: {
        groups: []
    },
    getters: {
        getGroups(state) {
            return state.groups;
        }
    },
    mutations: {
        setGroups(state, payload) {
            state.groups = payload;
        }
    },
    actions: {
        loadGroups(context) {
            axios.get(`group`)
                .then(res => { // успешное получение списка потоков
                    console.log(res.data)
                    if (res.data.status) {
                        context.commit('setGroups', res.data.groups); // заносим список групп в state
                    }

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => { // ответ с ошибкой
                    const data = err.response.data;
                    if (data.code === 403) { // проблемы с токеном
                        store.commit('logoutLocal');
                    }

                    Toast.show({
                        text: "Произошла ошибка при загрузке",
                        type: "danger",
                        duration: 3000
                    });

                    store.dispatch('updatePreloader', false);
                })
        }
    }
}