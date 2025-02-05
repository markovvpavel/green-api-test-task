import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { StateInstance } from "@/types";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type WithAuth = { idInstance: string; apiTokenInstance: string };

type LoginRequest = WithAuth;
type LoginResponse = AxiosResponse<{ stateInstance: StateInstance }>;

const login = async (req: LoginRequest) => {
  const API_URL = Cookies.get(COOKIE_KEYS.API_URL);

  return axios.get<{}, LoginResponse>(
    `${API_URL}/waInstance${req.idInstance}/getStateInstance/${req.apiTokenInstance}`
  );
};

type LogoutRequest = WithAuth;
type LogoutResponse = AxiosResponse<{ isLogout: boolean }>;

const logout = async (req: LogoutRequest) => {
  const API_URL = Cookies.get(COOKIE_KEYS.API_URL);

  return axios.get<{}, LogoutResponse>(
    `${API_URL}/waInstance${req.idInstance}/logout/${req.apiTokenInstance}`
  );
};

type SendMessageRequestData = { chatId: string; message: string };
type SendMessageRequest = WithAuth & {
  data: SendMessageRequestData;
};
type SendMessageResponse = AxiosResponse<{ idMessage: string }>;

const sendMessage = async (req: SendMessageRequest) => {
  const API_URL = Cookies.get(COOKIE_KEYS.API_URL);

  return axios.post<{}, SendMessageResponse, SendMessageRequestData>(
    `${API_URL}/waInstance${req.idInstance}/sendMessage/${req.apiTokenInstance}`,
    req.data
  );
};

type ReceiveNotificationRequest = WithAuth;
type ReceiveNotificationResponse = AxiosResponse<null | {
  receiptId: number;
  body: { typeWebhook: string };
}>;

const receiveNotification = async (req: ReceiveNotificationRequest) => {
  const API_URL = Cookies.get(COOKIE_KEYS.API_URL);

  return axios.get<{}, ReceiveNotificationResponse>(
    `${API_URL}/waInstance${req.idInstance}/receiveNotification/${req.apiTokenInstance}?receiveTimeout=5`
  );
};

type DeleteNotificationRequest = WithAuth & {
  receiptId: number;
};
type DeleteNotificationResponse = AxiosResponse;

const deleteNotification = async (req: DeleteNotificationRequest) => {
  const API_URL = Cookies.get(COOKIE_KEYS.API_URL);

  return axios.delete<{}, DeleteNotificationResponse>(
    `${API_URL}/waInstance${req.idInstance}/deleteNotification/${req.apiTokenInstance}/${req.receiptId}`
  );
};

const api = {
  login,
  logout,
  sendMessage,
  receiveNotification,
  deleteNotification,
};

export default api;
