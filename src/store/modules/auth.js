import axios from "../../axios";
import store from "../store";

import {Toast} from "native-base";

import * as SecureStore from "expo-secure-store";

export default {
    state: {
        response: {
            code: 200,
            errors: {},
            message: ""
        },
        user: {
            token: false,
            data: false
        }
    },
    getters: {
        response(state) {
            return state.response;
        },
        activeUser(state) {
            return state.user.data;
        },
        getToken(state) {
            return state.user.token
        },
        getResponse(state) {
            return state.response;
        }
    },
    mutations: {
        responseUpdate(state, payload) {
            state.response.code = 200;
            state.response.errors = {};
            state.response.message = "";

            state.response.code = payload.code;

            if (payload.message) {
                state.response.message = payload.message;
            }

            if (payload.errors) {
                for (let key in payload.errors) {
                    state.response.errors[key] = payload.errors[key][0];
                }
            }
        },
        responseClear(state) {
            state.response.code = 200;
            state.response.errors = {};
            state.response.message = "";
        },
        authSuccessful(state, payload) {
            state.user.token = payload.token;
            state.user.data = payload.user;
        },
        logoutLocal(state) {
            state.user.token = false;
            state.user.data = false;
        },
    },
    actions: {
        storeUser(context, payload) {
            SecureStore.setItemAsync('user', JSON.stringify(payload.user)).then(() => {
                SecureStore.setItemAsync('token', payload.token);
            })
        },
        login(context, payload) {
            const data = payload.data;

            axios.post('login', data)
                .then(res => {
                    if (res.data.status) {
                        const data = res.data;

                        //auth successful
                        context.commit('authSuccessful', data);
                        context.dispatch('storeUser', data);
                        context.commit('responseClear');

                        payload.navigation.navigate('Catalog');
                    }

                    store.dispatch('updatePreloader', false);
                })
                .catch(err => {
                    const data = err.response.data;
                    if (!data.status) {
                        context.commit('responseUpdate', data);
                        if (data.code === 202) { // validation error
                            Toast.show({
                                text: "Проверьте правильность заполнения полей",
                                type: "danger",
                                duration: 3000
                            });
                        } else if (data.code === 441) { // creds invalid
                            Toast.show({
                                text: "Введен неверный логин или пароль",
                                type: "danger",
                                duration: 3000
                            });
                        }

                        store.dispatch('updatePreloader', false);
                    }
                })
        },
        register(context, payload) {
            const data = payload.data;

            let formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('login', data.login);
            formData.append('group_id', data.group_id);
            formData.append('avatar', data.avatar);
            formData.append('password', data.password);
            formData.append('password_confirmation', data.password_confirmation);

            axios.post('register', formData)
                .then(res => {
                    if (res.data.status) {
                        context.commit('responseClear');

                        context.dispatch('login', {
                            data: data,
                            navigation: payload.navigation
                        });

                        Toast.show({
                            text: "Регистрация пройдена, входим в личный кабинет",
                            buttonText: "Закрыть",
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
        logout(context, payload) {
            SecureStore.deleteItemAsync('user').then(() => {
                SecureStore.deleteItemAsync('token');
            })

            context.commit('logoutLocal');

            payload.navigation.navigate('Login');
            store.dispatch('updatePreloader', false);
        },
        checkAuth(context, payload) {
            SecureStore.getItemAsync('user').then((user) => {
                if (user) {
                    SecureStore.getItemAsync('token').then((token) => {
                        context.commit('authSuccessful', { user: JSON.parse(user), token: token });
                        payload.navigation.navigate('Catalog');
                    });
                }
            })
        }
    }
}
