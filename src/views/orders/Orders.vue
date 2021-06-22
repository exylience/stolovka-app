<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      v-if="!loading"
      title="Заказы"
      :left-button="{
        show: false,
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
      <nb-text
        v-if="!loading && orders.length === 0"
        class="hint-text"
      >
        Вы пока ничего не заказывали
      </nb-text>

      <order-item
        v-for="order in orders"
        :key="order.id"
        :order="order"
      />
    </nb-content>

    <Footer
      v-if="!loading"
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "../../components/Header";
import Preloader from "../../components/Preloader";
import Footer from "../../components/Footer";
import OrderItem from "../../components/orders/OrderItem";

export default {
  name: "Favorite",
  components: {
    Header,
    Preloader,
    Footer,
    OrderItem
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
      orders: "getUserOrders"
    }),
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('updatePreloader', true);

    this.$store.dispatch('loadUserOrders');
  }
}
</script>

<style scoped>
  .hint-text {
    text-align: center;
    margin-top: 50%;
  }
</style>