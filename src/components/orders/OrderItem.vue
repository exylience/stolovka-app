<template>
  <nb-card>
    <nb-card-item bordered>
      <nb-left>
        <nb-body>
          <nb-text class="card-title">Заказ #{{ order.id }}</nb-text>

          <view class="card-date-block">
            <nb-icon name="calendar" :style="calendarIcon"/>
            <nb-text class="card-date" note>{{ parseDate(order.created_at) }}</nb-text>
          </view>
        </nb-body>
      </nb-left>
    </nb-card-item>

<!--    <nb-card-item>-->
<!--      <nb-body>-->

<!--        <nb-text>//Your text here</nb-text>-->
<!--      </nb-body>-->
<!--    </nb-card-item>-->

    <nb-card-item :style="{ paddingVertical: 0 }">
      <nb-left>
        <nb-button class="card-status" transparent :onPress="showStatusInfo">
          <nb-icon :name="getStatusIcon()" :style="{ color: getStatusColor() }"></nb-icon>
          <nb-text :style="{ color: getStatusColor() }">{{  getStatusText()  }}</nb-text>
        </nb-button>
      </nb-left>
    </nb-card-item>
  </nb-card>
</template>

<script>
import { Alert } from "react-native";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      calendarIcon: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5
      }
    }
  },
  methods: {
    parseDate(date) {
      let parsedDate = date.split(' ');
      parsedDate = parsedDate[0].split('-');

      return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
    },
    getStatusIcon() {
      if (this.order.status === 1) {
        return 'clock'
      } else if (this.order.status === 2) {
        return 'pizza'
      } else if (this.order.status === 3) {
        return 'checkmark'
      } else return 'close'
    },
    getStatusText() {
      if (this.order.status === 1) {
        return 'В обработке'
      } else if (this.order.status === 2) {
        return 'Готов'
      } else if (this.order.status === 3) {
        return 'Завершен'
      } else return 'Отклонен'
    },
    getStatusColor() {
      if (this.order.status === 1) {
        return '#62B1F6'
      } else if (this.order.status === 2) {
        return '#b59bc8'
      } else if (this.order.status === 3) {
        return '#5cb85c'
      } else return '#d9534f'
    },
    getStatusInfoMessage() {
      if (this.order.status === 1) {
        return 'Это означает, что заказ был успешно отправлен и ожидает рассмотрения. Наберитесь немного терпения :)'
      } else if (this.order.status === 2) {
        return 'Это означет, что заказ был готов, порция ожидает Вас в столовой, поторопитесь!'
      } else if (this.order.status === 3) {
        return 'Это означает, что вы оплатили забрали свой заказ. Надеемся, что Вам всё понравилось!'
      } else return 'Нам жаль, но заказ по какой-то причине не был принят. Попробуйте оформить заказ ещё раз или обратитесь в службу поддержки.'
    },
    showStatusInfo() {
      Alert.alert(
          `Заказ ${this.getStatusText().toLowerCase()}`,
          this.getStatusInfoMessage(),
          [
            {text: 'Ясно', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
      );
    }
  }
}
</script>

<style scoped>
  .card-title {
    font-size: 18px;
    font-weight: 700;
  }

  .card-date-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
  }

  .card-date {
    color: #fff;
  }
</style>