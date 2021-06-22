<template>
    <view class="container">
        <app-loading v-if="!isAppReady"> </app-loading>
        <app v-if="isAppReady"></app>
    </view>
</template>

<script>
    import Vue from "vue-native-core";
    import { VueNativeBase } from "native-base";
    import { AppLoading, SplashScreen } from "expo";
    import * as Font from "expo-font";

    import App from "../App.vue";

    import store from "../store/store";
    Vue.prototype.$store = store;

    // Регистрация дополнительных компонентов для глобального использования
    Vue.use(VueNativeBase);

    export default {
        components: { App, AppLoading },
        data() {
            return {
                isAppReady: false
            };
        },
        created() {
            SplashScreen.preventAutoHide();
            this.loadFonts();
        },
        methods: {
            /*
                Метод для подгрузки шрифтов при запуске приложения
             */
            async loadFonts() {
                try {
                    this.isAppReady = false;
                    await Font.loadAsync({
                        Roboto: require("native-base/Fonts/Roboto.ttf"),
                        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                        Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
                    });
                    this.isAppReady = true;
                } catch (error) {
                    console.log("some error occured", error);
                    this.isAppReady = true;
                }
            }
        }
    };
</script>

<style>
    .container {
        flex: 1;
    }
</style>