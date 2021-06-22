<template>
    <view class="preloader">
        <nb-spinner class="spinner"/>
    </view>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Preloader",
        props: {

        },
        computed: {
            ...mapGetters({
                loading: "isLoading"
            })
        },
        data() {
            return {

            }
        }
    }
</script>

<style>
    .preloader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-color: rgba(25, 25, 25, .8);
    }

    .spinner {
        margin-top: 100%;
    }
</style>