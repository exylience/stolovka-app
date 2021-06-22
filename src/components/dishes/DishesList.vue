<template>
  <SafeAreaView>
    <ScrollView :style="scrollerStyle" horizontal>
      <dish-item
        v-if="dishes.length !== 0"
        v-for="dish in dishes"
        :key="dish.id"
        :dish="dish"
        :style="{ marginRight: 15 }"
        :navigation="navigation"
      ></dish-item>
    </ScrollView>

    <nb-text v-if="dishes.length === 0" class="dishes-empty-text">
      Здесь пока пусто, но мы это скоро исправим! :)
    </nb-text>
  </SafeAreaView>
</template>

<script>
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import DishItem from "./DishItem";

export default {
  name: "DishesList",
  components: {
    SafeAreaView,
    ScrollView,
    DishItem
  },
  props: {
    dishes: {
      type: Array,
      required: true
    },
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      scrollerStyle: {
        backgroundColor: '#191919',
        paddingTop: 15
      }
    }
  }
}
</script>

<style scoped>
 .dishes-empty-text {
   text-align: center;
 }
</style>