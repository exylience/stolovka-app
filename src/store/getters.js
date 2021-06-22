import store from "./store";

const getters = {
    isLoading(state) {
        return state.loading;
    },
    getCardColors(state) {
        return state.cardColors;
    }
};

export default getters