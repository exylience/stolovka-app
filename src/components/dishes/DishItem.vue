<template>
  <touchable-opacity :on-press="openDish" :style="cardItem">
    <view class="dish-card">
      <view class="dish-like-block">
        <nb-button
          transparent
          :onPress="() => (favorites.includes(dish.id)) ? dislikeDish(dish.id) : likeDish(dish.id)"
        >
          <nb-icon
            active
            :name="(favorites.includes(dish.id)) ? 'heart' : 'heart-empty'"
            :style="addIcon"
          />
        </nb-button>
      </view>

      <view>
        <image
          v-if="dish.image_url"
          :source="{ uri: dish.image_url }"
          class="dish-image"
        ></image>

        <nb-icon v-if="false" active name="image" :style="imageIcon" />
      </view>

      <text class="dish-title">{{ dish.title }}</text>

      <view class="dish-bottom">
        <view class="dish-price-block">
          <nb-icon name='logo-bitcoin' :style="priceIcon"/>
          <text class="dish-price">{{ dish.price }}</text>
        </view>

        <view class="dish-add-block">
          <nb-button
            transparent
            :onPress="() => (cart.includes(dish.id)) ? removeFromCart(dish.id) : addToCart(dish.id)"
          >
            <nb-icon
              active
              :name="(cart.includes(dish.id)) ? 'close' : 'add'"
              :style="addIcon"
            />
          </nb-button>
        </view>
      </view>
    </view>
  </touchable-opacity>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DishItem",
  props: {
    dish: {
      type: Object,
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
      addIcon: {
        color: '#fff',
        fontSize: 20,
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
    randomColor() {
      const rand = Math.random() * (this.colors.length - 1);

      return this.colors[Math.round(rand)];
    },
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
    this.cardItem.backgroundColor = this.randomColor();
  }
}
</script>

<style scoped>
  .dish-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 200px;
    height: 200px;
  }

  .dish-like-block {
    position: absolute;
    top: 0;
    right: 0;
  }

  .dish-image {
    display: flex;
    align-self: center;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-top: 10px;
  }

  .dish-title {
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin-top: 5px;
  }

  .dish-bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .dish-price-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
  }

  .dish-price {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 2px;
  }
</style>