<template>
  <nb-container>
    <preloader v-if="loading" />

    <nb-content class="content">
      <nb-content class="logo-wrapper">
        <image class="logo" :style="logoStyle" :source="logo"/>
      </nb-content>

      <nb-form>
        <nb-content padder>
          <nb-item
            regular
            class="input-wrapper"
            :error="!!response['errors']['login']"
          >
            <nb-icon
              class="input-icon"
              active
              name="log-in"
              :style="{ color: (!!response['errors']['password']) ? '#e22134' : '#fff' }"
            />

            <nb-input
              class="form-input"
              v-model="login"
              placeholder="Логин"
              auto-capitalize="none"
              placeholderTextColor="#909197"
              :style="{ marginLeft: -5 }"
              selectionColor="#b59bc8"
            />
          </nb-item>

          <nb-item
            regular
            class="input-wrapper"
            :error="!!response['errors']['password']"
            bordered
          >
            <nb-icon
              class="input-icon"
              active
              name="lock"
              :style="{ color: (!!response['errors']['password']) ? '#e22134' : '#fff' }"
            />

            <nb-input
              class="form-input"
              v-model="password"
              placeholder="Пароль"
              auto-capitalize="none"
              placeholderTextColor="#909197"
              :secure-text-entry="isPasswordHidden"
              selectionColor="#b59bc8"
            />

            <nb-icon
              :name="(isPasswordHidden) ? 'eye' : 'eye-off'"
              :style="{ color: '#fff' }"
              :onPress="togglePasswordVisibility"
            />
          </nb-item>
        </nb-content>

        <nb-content padder>
          <nb-button
            primary
            block
            :onPress="signIn"
            class="form-btn"
          >
            <nb-text :style="{ color: '#fff', fontWeight: 'bold' }">
              Войти
            </nb-text>
          </nb-button>
        </nb-content>

        <nb-grid class="links-wrapper">
          <nb-text
              class="link"
              :onPress="() => this.props.navigation.navigate('Register')"
          >
              Нет аккаунта? Зарегистрируйтесь!
          </nb-text>
        </nb-grid>
      </nb-form>
    </nb-content>
  </nb-container>
</template>

<script>
  import { mapGetters } from "vuex";

  import Preloader from "../../components/Preloader";

  import logo from "../../../assets/logo.png";

  export default {
    name: "Login",
    components: {
      Preloader
    },
    props: {
      navigation: {
        type: Object
      }
    },
    async created() {
      await this.$store.dispatch('checkAuth', {
        navigation: this.navigation
      });
    },
    computed: {
      ...mapGetters({
        loading: "isLoading",
        response: "getResponse"
      })
    },
    data() {
      return {
        login: '',
        password: '',

        isPasswordHidden: true,

        logo,
        logoStyle: {
          width: 150,
          height: 150
        }
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('updatePreloader', true); // активация прелоадера

        // получение данных из формы
        const data = {
          login: this.login,
          password: this.password
        };

        // отправка запроса на сервер
        this.$store.dispatch('login', {
          data,
          navigation: this.navigation
        });

        // очистка формы
        this.initValues();
      },
      togglePasswordVisibility() {
        this.isPasswordHidden = (!this.isPasswordHidden);
      },
      initValues() {
        this.login = '';
        this.password = '';
      }
    },
  }
</script>

<style>
  .content {
    flex: 1;
    margin-top: 30%;
  }

  .logo {
    display: flex;
    align-self: center;
    margin-bottom: 50px;
  }

  .input-icon, .form-input {
    color: #fff;
  }

  .input-wrapper {
    background-color: #232323;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .form-btn {
    background-color: #b59bc8;
    border-radius: 10px;
  }

  .links-wrapper {
    align-self: center;
  }

  .link {
    margin-top: 30px;
    color: #a472c7;
    font-weight: 700;
  }
</style>