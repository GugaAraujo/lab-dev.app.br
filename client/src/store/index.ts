import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { NOTIFICATE, REMOVE_NOTIFICATION } from "./types-mutations";
import type { INotification } from "@/interfaces/INotifications";

import { type UserState, user } from "./modules/user";
import { CLOSE_NOTIFICATION } from "./types-action";

export interface Estado {
  user: UserState;
  notifications: any;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notifications: [],
    user: {
      user: [],
    },
  } as unknown as Estado,

  mutations: {
    [NOTIFICATE](state, newNotification: INotification) {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification: any) => notification.id != newNotification.id
        );
      }, 4000);
    },
    [REMOVE_NOTIFICATION](state, notificationId: number) {
      state.notifications = state.notifications.filter(
        (notification: any) => notification.id != notificationId
      );
    },
  },
  actions: {
    [CLOSE_NOTIFICATION]({ commit }, notificationId: number) {
      commit(REMOVE_NOTIFICATION, notificationId);
    },
  },
  modules: {
    user,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
