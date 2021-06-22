<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      v-if="!loading"
      title="Корзина"
      :left-button="{
        show: true,
        icon: 'arrow-back',
        action: () => this.props.navigation.goBack()
      }"
      :right-button="{
        show: false,
        icon: 'settings',
        action: () => {}
      }"
      :right-second-button="{
        show: false,
        icon: 'log-out',
        action: () => {}
      }"
      :badge="{
        show: false
      }"
    />

    <nb-content v-if="!loading" padder>
      <nb-text class="hint-text" v-if="cart.length === 0">Здесь появятся блюда, которые вы хотите заказать</nb-text>

      <dish-list-item
        v-for="dish in dishes"
        :key="dish.id"
        :dish="dish"
        v-if="cart.includes(dish.id)"
        :navigation="navigation"
        :style="{ marginBottom: 10 }"
        :fav-icon="false"
        :cart-actions-icon="true"
      />

      <view>
        <nb-button v-if="cart.length !== 0" class="order-btn" :onPress="openPreorder">
          <nb-text class="order-btn-text">Сформировать заказ</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "../../components/Header";
import Preloader from "../../components/Preloader";
import DishListItem from "../../components/dishes/DishListItem";

export default {
  name: "Cart",
  components: {
    Header,
    Preloader,
    DishListItem
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      loading: "isLoading",
      user: "activeUser",
      dishes: "getDishes",
      cart: "getCart"
    }),
  },
  data() {
    return {

    }
  },
  methods: {
    openPreorder() {
      this.navigation.navigate('Preorder');
    }
  },
  mounted() {
    this.$store.dispatch('updatePreloader', true);

    this.$store.dispatch('loadDishes');
  }
}
</script>

<style scoped>
.order-btn {
  background-color: #b59bc8;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.order-btn-text {
  color: #fff;
  font-weight: 700;
}

.hint-text {
  text-align: center;
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 50%;
}
</style>