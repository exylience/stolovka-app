<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      title=""
      :left-button="{
        show: true,
        icon: 'arrow-back',
        action: () => this.props.navigation.goBack()
      }"
      :right-button="{
        show: false
      }"
      :right-second-button="{
        show: false
      }"
    />

    <nb-content class="content">
      <nb-form>
        <nb-grid class="image-picker-wrapper" :onPress="checkCameraPermission">
          <nb-col class="image-preview">
            <nb-thumbnail square v-if="avatar !== null" class="picker-image" :source="avatar"/>
            <nb-icon v-if="avatar === null" class="picker-icon" name="image"/>
          </nb-col>

          <nb-col class="desc">
            <nb-text class="picker-text">Загрузите своё фото</nb-Text>
            <nb-text class="picker-text" note :numberOfLines="1">Форматы: jpeg, png, bmp</nb-Text>
          </nb-col>
        </nb-grid>

        <nb-content padder>
          <nb-item
            regular
            class="input-wrapper"
            :error="!!response['errors']['first_name']"
          >
            <nb-icon
              class="input-icon"
              active
              name="person"
              :style="{ color: (!!response['errors']['first_name']) ? '#e22134' : '#fff' }"
            />

            <nb-input
              class="form-input"
              v-model="first_name"
              placeholder="Имя"
              placeholderTextColor="#909197"
              :style="{ marginLeft: -5 }"
              selectionColor="#b59bc8"
            />
          </nb-item>

          <nb-item
            regular
            class="input-wrapper"
            :error="!!response['errors']['last_name']"
          >
            <nb-icon
              class="input-icon"
              active
              name="person"
              :style="{ color: (!!response['errors']['last_name']) ? '#e22134' : '#fff' }"
            />

            <nb-input
              class="form-input"
              v-model="last_name"
              placeholder="Фамилия"
              placeholderTextColor="#909197"
              :style="{ marginLeft: -5 }"
              selectionColor="#b59bc8"
            />
          </nb-item>

          <nb-item
            class="input-wrapper"
            picker
            regular
            :error="!!response['errors']['group_id']"
          >
            <nb-icon
              class="input-icon"
              active
              name="people"
              :style="{ color: (!!response['errors']['last_name']) ? '#e22134' : '#fff' }"
            />

            <nb-picker
              class="form-input"
              mode="dropdown"
              :iosIcon="getIosIcon()"
              :style="{ width: 350, marginLeft: -5 }"
              placeholder="Ваша группа"
              :placeholderStyle="{ color: '#ffffff' }"
              placeholderIconColor="#ffffff"
              :selectedValue="group_id"
              :onValueChange="onSelectGroup"
            >
              <item
                v-for="group in groups"
                :key="group.id"
                :label="group.title"
                :value="group.id"
              />
            </nb-picker>
          </nb-item>

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
              :style="{ color: (!!response['errors']['password_confirmation']) ? '#e22134' : '#fff' }"
            />

            <nb-input
              class="form-input"
              v-model="password_confirmation"
              placeholder="Подтверждение пароля"
              auto-capitalize="none"
              placeholderTextColor="#909197"
              secure-text-entry
              selectionColor="#b59bc8"
            />
          </nb-item>
        </nb-content>

        <nb-content padder>
          <nb-button
            primary
            block
            :onPress="signUp"
            class="form-btn"
          >
            <nb-text :style="{ color: '#fff', fontWeight: 'bold' }">
              Зарегистрироваться
            </nb-text>
          </nb-button>
        </nb-content>
      </nb-form>
    </nb-content>
  </nb-container>
</template>

<script>
  import React from "react";

  import { mapGetters } from "vuex";

  import { Picker, Icon, Toast } from "native-base";

  import * as ImagePicker from "expo-image-picker";

  import Header from "../../components/Header";
  import Preloader from "../../components/Preloader";


  export default {
    name: "Register",
    components: {
      Preloader,
      Header,
      Item: Picker.Item
    },
    props: {
      navigation: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        loading: "isLoading",
        response: "getResponse",
        groups: "getGroups"
      })
    },
    data() {
      return {
        first_name: '',
        last_name: '',
        group_id: 1,
        login: '',
        password: '',
        password_confirmation: '',

        avatar: null,

        isPasswordHidden: true,
      }
    },
    methods: {
      signUp() {
        this.$store.dispatch('updatePreloader', true);

        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          login: this.login,
          group_id: this.group_id,
          avatar: this.avatar,
          password: this.password,
          password_confirmation: this.password_confirmation,
        };

        this.$store.dispatch('register', {
          data: data,
          navigation: this.navigation
        });
      },
      togglePasswordVisibility() {
        this.isPasswordHidden = (!this.isPasswordHidden);
      },
      onSelectGroup(value) {
        this.group_id = value;
      },
      getIosIcon() {
        return <Icon name="ios-arrow-down-outline" />;
      },
      async checkCameraPermission() {
        let access = await ImagePicker.getCameraRollPermissionsAsync();

        if (access.status !== 'granted') {
          access = await ImagePicker.requestCameraRollPermissionsAsync();

          if (access.status === 'granted') {
            this.pickImage();
          } else {
            Toast.show({
                text: "Необходимо разрешение на чтение галереи!",
                buttonText: "Закрыть",
                type: "danger",
                duration: 3000
            });
          }
        } else {
          this.pickImage();
        }
      },
      async pickImage() {
        let image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          allowsMultipleSelection: false,
          aspect: [4, 3],
          quality: 1
        });

        if (!image.cancelled) {
          let urlParts = image.uri.split('.'),
              fileType = urlParts[urlParts.length - 1];

          this.avatar = {
            uri: image.uri,
            name: `photo.${fileType}`,
            type: `photo/${fileType}`,
          };
        }
      }
    },
    mounted() {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('loadGroups');
    }
  }
</script>

<style>
.content {
  flex: 1;
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

.image-picker-wrapper {
  padding: 10px;
  display: flex;
  align-self: center;
  margin-bottom: 10px;
}

.image-preview {
  width: 25%;
  justify-content: center;
  padding-left: 15px;
}

.picker-image {
  border-radius: 10px;
}

.picker-icon {
  font-size: 64px;
  color: #fff;
}

.desc {
  width: 75%;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  margin-bottom: 10px;
}

.picker-text {
  color: #fff;
}
</style>