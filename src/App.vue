<template>
  <style-wrapper>
    <root>
      <app-navigator/>
    </root>
  </style-wrapper>
</template>

<script>
import { React } from 'react';

import {
  createStackNavigator,
  createAppContainer,
} from 'vue-native-router';

import { Root } from 'native-base';
import StyleWrapper from "./theme/styleWrapper";

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

import Catalog from "./views/catalog/Catalog";
import Dish from "./views/dish/Dish";

import Orders from "./views/orders/Orders";
import Cart from "./views/cart/Cart";
import Preorder from "./views/cart/Preorder";

import Favorite from "./views/favorite/Favorite";

import Profile from "./views/profile/Profile";
import AddPost from "./views/profile/AddPost";

const StackNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },

    Catalog: { screen: Catalog },
    Dish: { screen: Dish },

    Orders: { screen: Orders },
    Cart: { screen: Cart },
    Preorder: { screen: Preorder },

    Favorite: { screen: Favorite },

    Profile: { screen: Profile },
    AddPost: { screen: AddPost },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  name: "App",
  components: {
    Root,
    AppNavigator,
    StyleWrapper
  }
}
</script>
