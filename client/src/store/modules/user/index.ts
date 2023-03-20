import http from "@/http";
import type IUser from "@/interfaces/IUser";
import type { Estado } from "@/store";
import {
  LOGIN,
  LOGOUT,
  REGISTER_USER,
} from "@/store/types-action";
import { ADD_USER, REMOVE_USER } from "@/store/types-mutations";
import type { Module } from "vuex";
import router from "@/router";
import { NotificationType } from "@/interfaces/INotifications";

export interface UserState {
  state: {
    user: [];
  }
  user: IUser | null;
}

export const user: Module<UserState, Estado> = {
  mutations: {
    [ADD_USER](state, user: IUser) {
      state.user = user;
    },
    [REMOVE_USER](state) {
      state.user = null;
    }
  },
  actions: {
    async [LOGIN]({ commit }, user: IUser) {
      const { email, password } = user;
      await http.post("/login", { email, password })
        .then((response: any) => {
          commit((ADD_USER), { ...response.data });
          localStorage.setItem('user', JSON.stringify(response.data));
          router.push('/');
        })
    },
    async [REGISTER_USER]({ commit }, user) {
      await http.post("/user", user)
        .then(() => {
          commit('NOTIFICATE', {
            title: "E-mail cadastrado",
            text: "Você já pode utilizar sua conta.",
            type: NotificationType.SUCCESS,
          }, { root: true });
          router.push('/login');
        })
    },
    [LOGOUT]({ commit }) {
      localStorage.clear();
      commit(REMOVE_USER);
    }
  },
};
