<template>
  <touchable-opacity :on-press="openDish">
    <view class="dish-list-item">
      <view class="dish-main">
        <image
          v-if="dish.image_url"
          :source="{ uri: dish.image_url }"
          class="dish-image"
        ></image>

        <view class="dish-info">
          <text class="dish-title">{{ dish.title }}</text>

          <view class="dish-price-block">
            <nb-icon name='logo-bitcoin' :style="priceIcon"/>
            <text class="dish-price">{{ dish.price }}</text>
          </view>
        </view>
      </view>

      <view class="dish-actions-block">
        <nb-button
          v-if="favIcon"
          transparent
          :onPress="() => (favorites.includes(dish.id)) ? dislikeDish(dish.id) : likeDish(dish.id)"
        >
          <nb-icon
            active
            :name="(favorites.includes(dish.id)) ? 'heart' : 'heart-empty'"
            :style="actionIcon"
          />
        </nb-button>

        <nb-button
          v-if="cartActionsIcon"
          transparent
          :onPress="() => (cart.includes(dish.id)) ? removeFromCart(dish.id) : addToCart(dish.id)"
        >
          <nb-icon
            active
            :name="(cart.includes(dish.id)) ? 'close' : 'add'"
            :style="actionIcon"
          />
        </nb-button>
      </view>
    </view>
  </touchable-opacity>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DishListItem",
  props: {
    dish: {
      type: Object,
      required: true
    },
    favIcon: {
      type: Boolean,
      required: true
    },
    cartActionsIcon: {
      type: Boolean,
      required: true
    },
    navigation: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      colors: "getCardColors",
      favorites: "getFavorites",
      cart: "getCart"
    })
  },
  data() {
    return {
      cardItem: {
        backgroundColor: '#b59bc8',
        borderRadius: 10
      },
      priceIcon: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10
      },
      actionIcon: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 700,
      },
      imageIcon: {
        color: '#fff',
        fontSize: 75,
        fontWeight: 700,
        display: 'flex',
        alignSelf: 'center',
        marginTop: 5
      }
    }
  },
  methods: {
    openDish() {
      this.navigation.navigate('Dish', { dish_id: this.dish.id })
    },
    likeDish(id) {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('likeDish', {
        dish_id: id
      });
    },
    dislikeDish(id) {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('dislikeDish', {
        dish_id: id
      });
    },
    addToCart(id) {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('addDishToCart', {
        dish_id: id
      });
    },
    removeFromCart(id) {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('removeDishFromCart', {
        dish_id: id
      });
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.dish-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #b59bc8;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.dish-main {
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dish-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dish-image {
  display: flex;
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
}

.dish-title {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
}

.dish-price-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
}

.dish-price {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 2px;
}

</style>