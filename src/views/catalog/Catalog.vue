<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      v-if="!loading"
      title=""
      :left-button="{
        show: false,
        icon: 'arrow-back',
        action: () => this.props.navigation.goBack()
      }"
      :right-button="{
        show: true,
        icon: 'basket',
        action: () => this.props.navigation.navigate('Cart')
      }"
      :right-second-button="{
        show: false
      }"
      :badge="{
        show: true,
        number: cart.length
      }"
    />

    <nb-content v-if="!loading" padder>
      <nb-content class="greetings">
        <nb-h3>Привет, {{ user.first_name }}!</nb-h3>
        <nb-h3>Есть будешь, или как?</nb-h3>
      </nb-content>

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
                placeholder="Поиск по буфетику"
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

      <nb-content class="recommendations">
        <nb-h3>Студенты рекомендуют</nb-h3>

        <view v-if="categories.length !== 0" class="recommendations-list">
          <dish-item :dish="categories[4].dishes[0]" :navigation="navigation"/>
        </view>
      </nb-content>

      <nb-content class="categories">
        <categories
          :categories="categories"
          :navigation="navigation"
        ></categories>
      </nb-content>
    </nb-content>

    <Footer
      v-if="!loading"
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
  import { mapGetters } from "vuex";

  import { Toast } from "native-base";

  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import Preloader from "../../components/Preloader";
  import Categories from "../../components/dishes/Categories";
  import DishItem from "../../components/dishes/DishItem";

  export default {
    name: "Catalog",
    components: {
      Header,
      Footer,
      Preloader,
      Categories,
      DishItem
    },
    props: {
      navigation: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        loading: 'isLoading',
        user: 'activeUser',
        categories: 'getCategoriesAndDishes',
        cart: "getCart"
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
    mounted() {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('loadCategoriesAndDishes');
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

  .search-bar {
    padding-top: 30px;
  }

  .recommendations {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .recommendations-list {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>