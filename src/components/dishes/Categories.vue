<template>
  <nb-tabs :renderTabBar="renderTab" class="tabs" :locked="true">
    <nb-tab :style="tabStyle" v-for="category in categories" :key="category.id" :heading="category.title">
      <dishes-list
        :dishes="category.dishes"
        :navigation="navigation"
      ></dishes-list>
    </nb-tab>
  </nb-tabs>
</template>

<script>
import React from "react";

import { ScrollableTab } from "native-base";

import DishesList from "./DishesList";

export default {
  name: "Categories",
  components: {
    DishesList
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      tabStyle: {
        borderColor: '#191919',
        backgroundColor: '#191919'
      }
    }
  },
  methods: {
    renderTab() {
      return <ScrollableTab />;
    }
  }
}
</script>

<style scoped>
  .tabs {
    border-bottom-color: #232323;
  }
</style>