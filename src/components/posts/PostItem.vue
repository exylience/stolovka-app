<template>
  <nb-card>
    <nb-card-item bordered>
      <nb-left>
        <nb-thumbnail :source="{ uri: post.user.avatar_url }"></nb-thumbnail>
        <nb-body>
          <view class="user-name-wrap">
            <nb-text>{{ post.user.first_name }} {{ post.user.last_name }}</nb-text>
            <nb-icon v-if="post.user.verified === 1" active name="checkmark" :style="stylesObj.checkmarkIcon"/>
          </view>

          <nb-text note>{{ parseDate(post.created_at) }}</nb-text>
        </nb-body>
      </nb-left>
    </nb-card-item>

    <nb-card-item v-if="post.image_url && !post.body" cardBody>
      <nb-body>
        <image :source="{ uri: post.image_url }" class="card-item-image" :style="stylesObj.cardItemImage"/>
      </nb-body>
    </nb-card-item>

    <nb-card-item v-if="post.image_url && post.body">
      <nb-body>
        <image v-if="post.image_url" :source="{ uri: post.image_url }" class="card-item-image body" :style="stylesObj.cardItemImageWithBody"/>
        <nb-text v-if="post.body">{{ post.body }}</nb-text>
      </nb-body>
    </nb-card-item>

    <nb-card-item v-if="!post.image_url && post.body">
      <nb-body>
        <nb-text v-if="post.body">{{ post.body }}</nb-text>
      </nb-body>
    </nb-card-item>

    <nb-card-item :style="{ paddingVertical: 0 }">
      <nb-left>
        <nb-button transparent>
          <nb-icon name="thumbs-up" active :style="(post.liked_by_user) ? stylesObj.actionBtnIconActive : stylesObj.actionBtnIcon"></nb-icon>
          <nb-text :style="stylesObj.actionBtnText">{{ post.likes_count }}</nb-text>
        </nb-button>

        <nb-button transparent>
          <nb-icon name="thumbs-down" active :style="(post.disliked_by_user) ? stylesObj.actionBtnIconActive : stylesObj.actionBtnIcon"></nb-icon>
          <nb-text :style="stylesObj.actionBtnText">{{ post.dislikes_count }}</nb-text>
        </nb-button>
      </nb-left>

      <nb-right>
        <view class="comments-block">
          <nb-icon name="chatboxes" active :style="stylesObj.commentsIcon"></nb-icon>
          <nb-text class="comments-num">{{ post.comments_count }}</nb-text>
        </view>
      </nb-right>
    </nb-card-item>
  </nb-card>
</template>

<script>
import { mapGetters } from "vuex";

import { Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      user: "activeUser"
    })
  },
  data() {
    return {
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
          width: deviceWidth,
        },
        cardItemImageWithBody: {
          resizeMode: "cover",
          width: deviceWidth / 1.18,
          display: 'flex',
          alignSelf: 'center'
        },
        commentsIcon: {
          color: '#fff'
        },
        actionBtnIcon: {
          color: '#fff'
        },
        actionBtnText: {
          color: '#fff'
        },
        actionBtnIconActive: {
          color: '#b59bc8'
        },
        actionBtnTextActive: {
          color: '#b59bc8'
        },
        checkmarkIcon: {
          color: '#fff',
          fontSize: 15,
          backgroundColor: '#b59bc8',
          width: 15,
          height: 15,
          borderRadius: 40,
          textAlign: 'center',
          lineHeight: 15,
          marginLeft: 10,
          marginTop: 2
        },
      }
    }
  },
  methods: {
    parseDate(date) {
      let parsedDate = date.split(' ');
      parsedDate = parsedDate[0].split('-');

      return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
    },
    slapLike() {
      this.$store.dispatch('slapLike', {

      });
    }
  }
}
</script>

<style scoped>
.card-item-image {
  flex: 1;
  height: 200px;
}

.body {
  margin-bottom: 10px;
}

.comments-block {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comments-num {
  font-weight: 700;
  color: #fff;
  margin-left: 10px;
}

.user-name-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>