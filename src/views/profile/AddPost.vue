<template>
  <nb-container>
    <Header
      title=""
      :left-button="{
        show: true,
        icon: 'close',
        action: () => this.props.navigation.goBack()
      }"
      :right-button="{
        show: false,
        icon: 'settings',
        action: () => {}
      }"
      :right-second-button="{
        show: true,
        icon: 'checkmark',
        action: () => {}
      }"
      :badge="{
        show: false
      }"
    />

    <nb-content>
      <nb-form>
        <nb-textarea
          :rowSpan="5"
          placeholder="Есть о чём рассказать?"
          placeholderTextColor="#909197"
          selectionColor="#b59bc8"
          :style="textArea"
          v-model="postBody"
          :maxFontSizeMultiplier="null"
        />

        <nb-content>
          <nb-button transparent>
            <nb-icon name="image" :style="imageIcon"/>
          </nb-button>
        </nb-content>
      </nb-form>
    </nb-content>
  </nb-container>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "../../components/Header";
import Preloader from "../../components/Preloader";

import { Dimensions } from "react-native";
const deviceHeight = Dimensions.get("window").height;


export default {
  name: "AddPost",
  components: {
    Header,
    Preloader
  },
  props: {

  },
  watch: {
    postBody(val) {
      this.textArea.fontSize = (val.length > 100) ? 16 : 26
    }
  },
  data() {
    return {
      imageIcon: {
        color: '#fff',
        fontSize: 26
      },
      textArea: {
        height: deviceHeight / 1.18,
        fontSize: 26
      },

      postBody: '',
      image: false
    }
  },
  methods: {
    makePost() {
      this.$store.dispatch('updatePreloader', true);

      const data = {
        body: this.postBody,
        image: this.image
      }
    }
  },
  mounted() {

  }

}
</script>

<style scoped>

</style>