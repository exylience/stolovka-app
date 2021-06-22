<template>
  <nb-container>
    <preloader v-if="loading" />

    <view class="dish-header">
      <gradient-background :gradient="['#a472c7', '#b59bc8']" class="bg" />

      <nb-button
        transparent
        class="back-btn"
        :onPress="() => this.props.navigation.goBack()"
      >
        <nb-icon name="arrow-back" :style="{ color: '#fff' }"/>
      </nb-button>

      <nb-button
        class="fav-btn"
        :onPress="() => (favorites.includes(dish.id)) ? dislikeDish(dish.id) : likeDish(dish.id)"
      >
        <nb-icon :name="(favorites.includes(dish.id)) ? 'heart' : 'heart-empty'" :style="heartIcon"/>
      </nb-button>

      <view class="dish-header-info">
        <view class="dish-image-wrapper">
          <image class="dish-image" :source="{ uri: dish.image_url }"></image>
        </view>

        <nb-h3 class="dish-title">{{ dish.title }}</nb-h3>
      </view>
    </view>

    <nb-content>
      <view v-if="!loading">
        <nb-h3 class="section-title">Информация</nb-h3>
        <view class="dish-info">
          <nb-text class="dish-desc">{{ dish.description }}</nb-text>

          <view class="dish-price-wrapper">
            <nb-icon name="logo-bitcoin" :style="priceIcon"/>
            <nb-text class="dish-price">{{ dish.price }}</nb-text>
          </view>
        </view>

        <nb-h3 class="section-title">Оценки и отзывы</nb-h3>
        <view class="dish-rating" padder>
          <view class="dish-rate">
            <nb-text ref="rate" class="dish-rate-num rate">{{ animatedNumber }}</nb-text>
          </view>
        </view>

        <view class="leave-review">
          <view class="stars-line">
            <nb-button transparent class="icon-btn" :onPress="() => setRate(1)">
              <nb-icon
                active
                :name="(rate >= 1) ? 'star' : 'star-outline'"
                :style="starIcon"
              />
            </nb-button>

            <nb-button transparent class="icon-btn" :onPress="() => setRate(2)">
              <nb-icon
                active
                :name="(rate >= 2) ? 'star' : 'star-outline'"
                :style="starIcon"
              />
            </nb-button>

            <nb-button transparent class="icon-btn" :onPress="() => setRate(3)">
              <nb-icon
                active
                :name="(rate >= 3) ? 'star' : 'star-outline'"
                :style="starIcon"
              />
            </nb-button>

            <nb-button transparent class="icon-btn" :onPress="() => setRate(4)">
              <nb-icon
                active
                :name="(rate >= 4) ? 'star' : 'star-outline'"
                :style="starIcon"
              />
            </nb-button>

            <nb-button transparent class="icon-btn" :onPress="() => setRate(5)">
              <nb-icon
                active
                :name="(rate >= 5) ? 'star' : 'star-outline'"
                :style="starIcon"
              />
            </nb-button>
          </view>

          <nb-form class="form">
            <nb-item
              regular
              class="input-wrapper"
              :error="!!response['errors']['body']"
              bordered
            >
              <nb-icon
                class="input-icon"
                active
                name="information-circle"
                :style="{ color: (!!response['errors']['body']) ? '#e22134' : '#fff' }"
              />

              <nb-input
                class="form-input"
                v-model="review"
                placeholder="Оставьте свой отзыв"
                auto-capitalize="none"
                placeholderTextColor="#909197"
                selectionColor="#b59bc8"
              />
            </nb-item>

            <nb-button class="send-review-btn" :onPress="sendReview">
              <nb-icon
                active
                name="paper-plane"
                :style="sendIcon"
              />
            </nb-button>
          </nb-form>
        </view>

        <view class="dish-reviews">
          <review-item
            v-for="review in dish.reviews"
            :key="review.id"
            :review="review"
            :style="{ marginBottom: 15 }"
          />
        </view>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import { TweenLite } from "gsap";

import Preloader from "../../components/Preloader";
import GradientBackground from "../../components/GradientBackground";
import ReviewItem from "../../components/reviews/ReviewItem";

export default {
  name: "Dish",
  components: {
    Preloader,
    GradientBackground,
    ReviewItem,
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      loading: "isLoading",
      dish: "getActiveDish",
      response: "getResponse",
      favorites: "getFavorites"
    })
  },
  watch: {
    number(val) {
      if (val === 0 || !val) {
        this.animatedNumber = 0;
        this.tweenedNumber = 0;
      } else {
        TweenLite.to(this, {
          tweenedNumber: val,
          duration: 0.5,
          onUpdate: () => this.animatedNumber = this.tweenedNumber.toFixed(1)
        })
      }
    },
    dish(val) {
      this.number = val.rating
    }
  },
  data() {
    return {
      priceIcon: {
        color: '#fff',
        marginRight: 10
      },
      heartIcon: {
        color: '#fff',
        fontSize: 22
      },
      starIcon: {
        fontSize: 30,
        color: '#fff'
      },
      sendIcon: {
        color: '#fff',
        fontSize: 22
      },

      number: 0,
      tweenedNumber: 0,
      animatedNumber: 0,

      review: '',
      rate: 0
    }
  },
  methods: {
    setRate(rate) {
      this.rate = rate;
    },
    sendReview() {
      this.$store.dispatch('updatePreloader', true);

      const data = {
        body: this.review,
        rate: this.rate,
        dish_id: this.dish.id
      }

      this.$store.dispatch('storeReview', {
        data
      });

      this.initValues();
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
    initValues() {
      this.rate = 0;
      this.review = '';
    }
  },
  mounted() {
    this.$store.dispatch('updatePreloader', true);

    this.$store.dispatch('loadDish', {
      dish_id: this.navigation.getParam('dish_id')
    });

    this.number = this.dish.rating
  }
}
</script>

<style scoped>
  .dish-header {
    position: relative;
    height: 150px;
    margin-bottom: 10px;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .back-btn {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .dish-header-info {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .dish-image-wrapper {
    height: 100%;
    display: flex;
    padding-bottom: 10px;
    padding-left: 10px;
    justify-content: flex-end;
  }

  .dish-image {
    width: 75px;
    height: 75px;
    border-radius: 150px;
    margin-right: 10px;
  }

  .dish-title {
    width: 150px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .dish-info {
    padding-left: 10px;
    padding-right: 10px;
  }

  .fav-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 25px;
    bottom: -25px;
    z-index: 0;
    border-radius: 50px;
    background-color: #a472c7;
    display: flex;
    justify-content: center;
  }

  .section-title {
    font-weight: 700;
    margin-left: 10px;
    margin-top: 10px;
  }

  .dish-desc {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .dish-price-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  .dish-price {
    font-size: 20px;
  }

  .dish-rating {
    margin-top: 10px;
  }

  .dish-rate {
    width: 75px;
    height: 75px;
    border-radius: 50px;
    display: flex;
    align-self: center;
    margin-top: 10px;
    background-color: #b59bc8;
  }

  .dish-rate-num {
    font-size: 30px;
    text-align: center;
    line-height: 75px;
  }

  .leave-review {
    margin-top: 15px;
  }

  .form {
    width: 100%;
    background-color: #191919;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }

  .input-icon, .form-input {
    color: #fff;
  }

  .input-wrapper {
    width: 80%;
    background-color: #232323;
    border-radius: 10px;
  }

  .send-review-btn {
    width: 50px;
    height: 50px;
    align-self: center;
    border-radius: 10px;
    background-color: #b59bc8;
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }

  .stars-line {
    display: flex;
    flex-direction: row;
    align-self: center;
    margin-bottom: 15px;
  }

  .dish-reviews {
    padding-top: 20px;
    padding-left: 10px;
  }
</style>