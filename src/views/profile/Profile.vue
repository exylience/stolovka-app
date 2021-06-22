<template>
  <nb-container>
    <preloader v-if="loading" />

    <Header
      :title="`@${user.login}`"
      :left-button="{
        show: false,
        icon: 'arrow-back',
        action: () => this.props.navigation.goBack()
      }"
      :right-button="{
        show: true,
        icon: 'settings',
        action: () => {}
      }"
      :right-second-button="{
        show: true,
        icon: 'log-out',
        action: logout
      }"
      :badge="{
        show: false
      }"
    />

    <nb-content v-if="user" padder>
      <view class="user-wrapper">
        <view class="avatar-block">
          <image class="user-photo" :source="{ uri: user.avatar_url }"></image>
          <nb-icon v-if="false" active name="camera" :style="cameraIcon"/>
        </view>

        <view class="user-info">
          <view class="user-name-wrapper">
            <nb-h3 class="user-name">{{ user.first_name }} {{ user.last_name }}</nb-h3>
            <nb-icon v-if="user.verified === 1" active name="checkmark" :style="checkmarkIcon"/>
          </view>

          <view class="user-status">
            <nb-icon active name="star" :style="medalIcon"/>
            <nb-text class="user-status-title">{{ user.level.title }}</nb-text>
          </view>
        </view>
      </view>

      <nb-button class="user-edit-btn">
        <nb-text class="user-edit-btn-text">Редактировать</nb-text>
      </nb-button>

      <nb-content class="posts-list">
        <nb-button class="user-post-btn" transparent :onPress="writePost">
          <nb-icon name="create" :style="createIcon"/>
          <nb-text class="user-post-btn-text">Написать пост</nb-text>
        </nb-button>

        <post-item
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </nb-content>
    </nb-content>

    <Footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
  import { mapGetters } from "vuex";

  import Header from "../../components/Header";
  import Preloader from "../../components/Preloader";
  import Footer from "../../components/Footer";
  import PostItem from "../../components/posts/PostItem";

  export default {
    name: "Profile",
    components: {
      Header,
      Preloader,
      Footer,
      PostItem
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
        posts: "getUserPosts"
      })
    },
    data() {
      return {
        cameraIcon: {
          fontSize: 50,
          color: '#fff',
          display: 'flex',
          alignSelf: 'center',
          lineHeight: 75
        },
        medalIcon: {
          color: '#fff',
          marginRight: 10,
          fontSize: 18
        },
        checkmarkIcon: {
          color: '#fff',
          fontSize: 15,
          backgroundColor: '#b59bc8',
          width: 20,
          height: 20,
          borderRadius: 40,
          textAlign: 'center',
          lineHeight: 20
        },
        userStatus: {
          color: '#fff'
        },
        createIcon: {
          color: '#b59bc8',
          fontSize: 18
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('updatePreloader', true);

        this.$store.dispatch('logout', {
          navigation: this.navigation
        });
      },
      writePost() {
        this.navigation.navigate('AddPost');
      }
    },
    mounted() {
      this.$store.dispatch('updatePreloader', true);

      this.$store.dispatch('loadUserPosts');

      this.medalIcon.color = this.user.level.color;
      this.userStatus.color = this.user.level.color;
    }
  }
</script>

<style scoped>
  .user-wrapper {
    display: flex;
    flex-direction: row;
  }

  .avatar-block {
    margin-right: 15px;
    width: 75px;
    height: 75px;
    border-radius: 150px;
    background-color: #b59bc8;
  }

  .user-photo {
    width: 75px;
    height: 75px;
    border-radius: 150px;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
  }

  .user-name-wrapper {
    display: flex;
    flex-direction: row;
  }

  .user-name {
    font-weight: 700;
    margin-right: 10px;
  }

  .user-status {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .user-edit-btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    background-color: #b59bc8;
    border-radius: 10px;
  }
  
  .user-edit-btn-text {
    color: #fff;
    font-weight: 700;
    text-transform: capitalize;
  }

  .posts-list {
    padding-top: 30px;
  }

  .user-post-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .user-post-btn-text {
    color: #b59bc8;
    font-size: 14px;
    font-weight: 700;
  }
</style>