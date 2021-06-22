<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      v-if="!loading"
      title="Оформление заказ"
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
      <nb-content class="order-card" padder>
        <view>
          <nb-text class="card-title">Детали заказа</nb-text>
        </view>

        <scroll-view class="dish-order-list">
          <view
            class="dish-order-item"
            v-for="dish in dishes"
            :key="dish.id"
            v-if="cart.includes(dish.id)"
          >
            <nb-icon name="arrow-dropright" :style="listIcon"/>
            <nb-text class="dish-order-item-title">{{ dish.title }}</nb-text>
          </view>
        </scroll-view>

        <view>
          <nb-text class="card-price">Итоговая цена: {{ countFullPrice() }} руб.</nb-text>
        </view>
      </nb-content>

      <view>
        <nb-button class="order-btn" :onPress="sendOrder">
          <nb-text class="order-btn-text">Отправить заказ</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "../../components/Header";
import Preloader from "../../components/Preloader";

export default {
  name: "Preorder",
  components: {
    Header,
    Preloader,
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
      listIcon: {
        fontSize: 16,
        color: '#fff',
        marginRight: 5
      },
    }
  },
  methods: {
    countFullPrice() {
      let fullPrice = 0;

      this.dishes.forEach(dish => {
        if (this.cart.includes(dish.id)) fullPrice += dish.price;
      })

      return fullPrice
    },
    sendOrder() {
      this.$store.dispatch('updatePreloader', true);

      const data = {
        dishes: this.cart,
        total_price: this.countFullPrice()
      };

      this.$store.dispatch('storeOrder', {
        data,
        navigation: this.navigation
      });
    }
  },
  mounted() {
    this.$store.dispatch('updatePreloader', true);

    this.$store.dispatch('loadDishes');
  }
}
</script>

<style scoped>
.order-card {
  border-radius: 10px;
  border-top-color: #232323;
  border-bottom-color: #232323;
  border-left-color: #232323;
  border-right-color: #232323;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  padding: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
}

.card-price {
  font-weight: 700;
}

.dish-order-list {
  margin-top: 30px;
  margin-bottom: 30px;
}

.dish-order-item {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dish-order-item-title {
  font-size: 14px;
}

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
</style>