<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button
        v-for="tab in tabs"
        :key="tab.route"
        :active="isActiveRoute(tab.route)"
        :onPress="() => handleRouting(tab.route)"
      >
        <nb-icon :name="tab.icon" />
        <nb-text>{{ tab.name }}</nb-text>
      </nb-button>
    </nb-footer-tab>
  </nb-footer>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      navigation: {
        type: Object
      }
    },
    data() {
      return {
        tabs: [
          {
            name: "Блюда",
            route: "Catalog",
            icon: "restaurant",
          },
          {
            name: "Заказы",
            route: "Orders",
            icon: "wallet",
          },
          {
            name: "Любимое",
            route: "Favorite",
            icon: "heart",
          },
          {
            name: "Профиль",
            route: "Profile",
            icon: "person",
          }
          // {
          //     name: "Обратная связь",
          //     route: "Feedback",
          //     icon: "chatbubbles",
          // }
        ],
      }
    },
    methods: {
      isActiveRoute(route) {
        let currentRoute = this.navigation.state.routeName;

        return (currentRoute === route);
      },
      handleRouting(route) {
        this.navigation.navigate(route)
      }
    },
  }
</script>

<style scoped>

</style>