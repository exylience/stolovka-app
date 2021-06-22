<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      v-if="!loading"
      title="Любимое"
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
      <nb-content class="search-bar">
        <nb-row>
          <nb-form class="search-form">
            <nb-item
              regular
              class="input-wrapper"
            >
              <nb-icon
                class="input-icon"
                active
                name="search"
                :style="{ color: '#fff' }"
              />

              <nb-input
                class="form-input"
                v-model="searchQuery"
                placeholder="Поиск"
                placeholderTextColor="#909197"
                :style="{ marginLeft: -5 }"
                selectionColor="#b59bc8"
              />
            </nb-item>
          </nb-form>

          <nb-button transparent>
            <nb-icon class="input-icon" active name="list" :style="{ color: '#fff' }" />
          </nb-button>
        </nb-row>
      </nb-content>

      <view>
        <dish-list-item
          v-for="dish in dishes"
          :key="dish.id"
          :dish="dish"
          v-if="favorites.includes(dish.id)"
          :navigation="navigation"
          :style="{ marginBottom: 10 }"
          :fav-icon="true"
          :cart-actions-icon="false"
        />
      </view>
    </nb-content>

    <Footer
      v-if="!loading"
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import {Toast} from "native-base";

import Header from "../../components/Header";
import Preloader from "../../components/Preloader";
import Footer from "../../components/Footer";
import DishListItem from "../../components/dishes/DishListItem";

export default {
  name: "Favorite",
  components: {
    Header,
    Preloader,
    Footer,
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
      favorites: "getFavorites",
      dishes: "getDishes"
    }),
    searchQuery: {
      get () {
        return this.$store.getters.getDishSearchQuery
      },
      set (val) {
        if (val.toLowerCase() === 'лох') {
          Toast.show({
            text: "Сам такой :c",
            buttonText: "",
            type: "warning",
            duration: 1000
          });
        }

        this.$store.dispatch('searchDishes', val)
      }
    },
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('updatePreloader', true);

    this.$store.dispatch('loadDishes');
  }
}
</script>

<style scoped>
.input-icon, .form-input {
  color: #fff;
}

.search-form {
  width: 85%;
}

.input-wrapper {
  background-color: #232323;
  border-radius: 10px;
  margin-bottom: 15px;
}

.input-icon {
  margin-top: 5px;
}

</style>