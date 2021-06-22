<template>
  <nb-header hasTabs :noLeft="!leftButton.show">
    <nb-left>
      <nb-button
        transparent
        v-if="leftButton.show"
        :onPress="leftButton.action"
      >
        <nb-icon :name="leftButton.icon"/>
      </nb-button>
    </nb-left>

    <nb-body>
      <nb-title class="header-title">{{ title }}</nb-title>
    </nb-body>

    <nb-right>
      <nb-button
        transparent
        v-if="rightButton.show"
        :onPress="rightButton.action"
      >
        <nb-icon :name="rightButton.icon" :style="{ color: '#b59bc8' }"/>

        <nb-badge
          v-if="badge.show"
          class="badge"
          :style="{ width: (badge.number >= 10) ? 50 : 25 }"
        >
          <nb-text class="badge__text">{{ badge.number }}</nb-text>
        </nb-badge>
      </nb-button>

      <nb-button
        transparent
        v-if="rightSecondButton.show"
        :onPress="rightSecondButton.action"
      >
        <nb-icon :name="rightSecondButton.icon" :style="{ color: '#b59bc8' }"/>
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
  import { React } from 'react';

  export default {
    name: 'Header',
    props: {
      title: { type: String },
      badge: {
        show: false,
        number: {
          type: Number,
          default: 0
        }
      },
      navigation: { type: Object },
      leftButton: { type: Object },
      rightButton: { type: Object },
      rightSecondButton: { type: Object },
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .header-title {
    font-weight: 700;
  }

  .badge {
    height: 25px;
  }

  .badge__text {
    line-height: 25px;
    font-size: 12px;
    font-weight: 700;
  }
</style>