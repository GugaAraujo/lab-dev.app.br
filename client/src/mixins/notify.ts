import type { NotificationType } from "@/interfaces/INotifications";
import { NOTIFICATE } from "@/store/types-mutations";
import { store } from '@/store'

export const noticacaoMixin = {
  methods: {
    notificar(type: NotificationType, title: string, text: string): void {
      store.commit(NOTIFICATE, {
        title,
        text,
        type,
      });
    },
  },
};
