import router from '@/router';
import axios from 'axios'
import type { AxiosInstance } from 'axios';
import { NotificationType } from "@/interfaces/INotifications";
import { NOTIFICATE } from "@/store/types-mutations";
import { store } from "@/store"

const errorTypes = {
  UPPERCASE: 'The password must have at least 1 uppercase letter',
  LOWERCASE: 'Password must have at least 1 lowercase letter',
  LINE_BREAK: 'The password must not have line break',
  SPECIAL_CHAR: 'Password must have at least 1 special character',
  NUMBER: 'Password must have at least 1 number',
  EMAIL_EXIST: 'Email is already in use',
  NOT_EMAIL: "email must be an email",
  PASSWORD_SHORT:  "password must be longer than or equal to 6 characters",
  NAME_SHORT:  "name must be longer than or equal to 4 characters",
  NAME_LONG:  "name must be shorter than or equal to 20 characters",
  NAME_EMPTY:  "name should not be empty",
  NAME_NOT_STRING: "name must be a string",
}
//
const clientHttp: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

clientHttp.interceptors.request.use(
  (config: any) => {
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

clientHttp.interceptors.response.use(null, (error: any) => {
  const { message, statusCode } = error.response.data;

  if (statusCode === 401) {
    router.push('/logout');
  }
  if (statusCode === 403) {
    store.commit(NOTIFICATE, {
      title: "Não permitido",
      text: 'Seu usuário não tem permissão para realizar esta operação',
      type: NotificationType.FAIL,
    }, { root: true });
    throw new Error(error);
  }
  if (statusCode == 400 || statusCode === 409) {
    let text = "Verifique os campos preechidos"
    if (message === errorTypes.UPPERCASE || message[0] === errorTypes.UPPERCASE) {
      text = "A senha deve ter pelo menos 1 letra maiúscula"
    }
    if (message === errorTypes.LOWERCASE || message[0] === errorTypes.LOWERCASE) {
      text = "A senha deve ter pelo menos 1 letra minúscula"
    }
    if (message === errorTypes.LINE_BREAK || message[0] === errorTypes.LINE_BREAK) {
      text = "A senha não pode ter quebra de linha"
    }
    if (message === errorTypes.SPECIAL_CHAR || message[0] === errorTypes.SPECIAL_CHAR) {
      text = "A senha deve ter pelo menos 1 caractere especial"
    }
    if (message === errorTypes.NUMBER || message[0] === errorTypes.NUMBER) {
      text = "A senha deve ter pelo menos 1 número"
    }
    if (message === errorTypes.NUMBER || message[0] === errorTypes.NUMBER) {
      text = "A senha deve ter pelo menos 1 número"
    }
    if (message === errorTypes.EMAIL_EXIST || message[0] === errorTypes.EMAIL_EXIST) {
      text = "Email já cadastrado"
    }
    if (message === errorTypes.NOT_EMAIL || message[0] === errorTypes.NOT_EMAIL) {
      text = "Email inválido"
    }
    if (message === errorTypes.NAME_NOT_STRING || message[0] === errorTypes.NAME_NOT_STRING) {
      text = "Nome inválido"
    }
    if (message === errorTypes.NAME_SHORT || message[0] === errorTypes.NAME_SHORT) {
      text = "Nome deve ter mais que 4 letras"
    }
    if (message === errorTypes.NAME_LONG || message[0] === errorTypes.NAME_LONG) {
      text = "Nome deve ter até que 20 letras"
    }
    if (message === errorTypes.NAME_EMPTY || message[0] === errorTypes.NAME_EMPTY) {
      text = "O nome deve ser preenchido"
    }

    store.commit(NOTIFICATE, {
      title: "Dados incorretos",
      text,
      type: NotificationType.FAIL,
    }, { root: true });
    throw new Error(error);
  }
});

export default clientHttp;
