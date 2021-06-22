<template>
  <linear-gradient
    class="bg"
    :colors="gradient"
    :start="[0, 1]"
    :end="[0.8, 0.3]"
  ></linear-gradient>
</template>

<script>
import { LinearGradient } from "expo-linear-gradient";

export default {
  name: "GradientBackground",
  components: {
    LinearGradient
  },
  props: {
    gradient: Array
  }
}
</script>

<style scoped>
  .bg {
      width: 100%;
      height: 100%;
  }
</style>