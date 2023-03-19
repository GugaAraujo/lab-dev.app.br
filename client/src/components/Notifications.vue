<template>
  <div class="notifications" :class="notifications.length ? 'fade-effect' : ''">
    <div class="bg-white rounded mt-3" v-for="notification in notifications">
      <article class="message rounded p-2 bg-opacity-75" :class="context[notification.type]"
        :key="notification.id">
        <div class="message-header d-flex justify-content-between w-100">
          <p>
            {{ notification.title }}
          </p>
          <button class="btn text-white ms-auto" @click="closeNotification(notification.id)" aria-label="delete">X</button>
        </div>
        <div class="message-body">
          {{ notification.text }}
        </div>
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NotificationType } from '@/interfaces/INotifications'
import { CLOSE_NOTIFICATION } from '@/store/types-action';
import { computed } from 'vue'
import { useStore } from '../store'
const context = {
  [NotificationType.SUCCESS]: 'bg-success',
  [NotificationType.WARNING]: 'bg-warning',
  [NotificationType.FAIL]: 'bg-danger'
} as any;
const store = useStore();
const notifications = computed(() => store.state.notifications);

function closeNotification(notificationId: NotificationType) {
  store.dispatch(CLOSE_NOTIFICATION, notificationId);
}
</script>
<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  z-index: 10;
  opacity: 0;
  animation: fade-in .65s ease-in forwards;
}

.fade-effect {
  transform: scale(0);
  border-radius: 50%;
  opacity: 0;
  overflow: hidden;
  animation: scale-in .3s ease-out forwards,
    expand .35s .25s ease-out forwards;
}

@keyframes scale-in {
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes expand {
  50% {
    border-radius: 6px;
  }

  100% {
    border-radius: 4px;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: .8;
  }
}</style>
