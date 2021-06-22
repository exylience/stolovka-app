<template>
  <view class="review">
    <view class="user-info">
      <image
        class="review-user-avatar"
        :source="{ uri: review.user.avatar_url }"
      ></image>

      <view class="user-info-text">
        <view class="user-name-wrapper">
          <nb-h3 class="user-name">{{ review.user.first_name }} {{ review.user.last_name }}</nb-h3>
          <nb-icon v-if="review.user.verified === 1" active name="checkmark" :style="checkmarkIcon"/>
        </view>

        <view class="stars-line-wrapper">
          <view class="stars-line">
            <nb-icon
              active
              :name="(review.rate >= 1) ? 'star' : 'star-outline'"
              :style="starIcon"
            />

            <nb-icon
              active
              :name="(review.rate >= 2) ? 'star' : 'star-outline'"
              :style="starIcon"
            />

            <nb-icon
              active
              :name="(review.rate >= 3) ? 'star' : 'star-outline'"
              :style="starIcon"
            />

            <nb-icon
              active
              :name="(review.rate >= 4) ? 'star' : 'star-outline'"
              :style="starIcon"
            />

            <nb-icon
              active
              :name="(review.rate >= 5) ? 'star' : 'star-outline'"
              :style="starIcon"
            />
          </view>

          <nb-text class="review-date">{{ parseDate(review.created_at) }}</nb-text>
        </view>
      </view>
    </view>

    <view>
      <nb-text class="review-body">{{ review.body }}</nb-text>
    </view>
  </view>
</template>

<script>
export default {
  name: "ReviewItem",
  props: {
    review: {
      type: Object,
      required: true
    },
  },
  computed: {

  },
  data() {
    return {
      starIcon: {
        fontSize: 15,
        color: '#fff',
        marginRight: 5
      },
      checkmarkIcon: {
        color: '#fff',
        fontSize: 10,
        backgroundColor: '#b59bc8',
        width: 15,
        height: 15,
        borderRadius: 40,
        textAlign: 'center',
        lineHeight: 15
      }
    }
  },
  methods: {
    parseDate(date) {
      let parsedDate = date.split(' ');
      parsedDate = parsedDate[0].split('-');

      return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .user-info {
    display: flex;
    flex-direction: row;
  }

  .review-user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 10px;
  }

  .stars-line {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-right: 10px;
  }

  .user-info-text {
    display: flex;
    justify-content: space-between;
  }

  .user-name-wrapper, .stars-line-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .user-name {
    font-size: 18px;
    font-weight: 700;
    margin-right: 5px;
  }

  .review-date {
    font-size: 15px;
  }

  .review-body {
    margin-top: 10px;
  }
</style>