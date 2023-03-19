import type { NotificationType } from "@/interfaces/INotifications"
import { NOTIFICATE } from "@/store/types-mutations"
import { store } from '@/store'

type Notificador = {
  notify: (type: NotificationType, title: string, text: string) => void
}

export default (): Notificador => {
  const notify = (type: NotificationType, title: string, text: string): void => {
    store.commit(NOTIFICATE, {
      title,
      text,
      type,
    });
  }

  return {
    notify
  }
}
