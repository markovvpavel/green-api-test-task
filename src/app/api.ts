import { StateInstance } from "@/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

type WithAuth = { idInstance: string; apiTokenInstance: string };

type LoginRequest = WithAuth;
type LoginResponse = AxiosResponse<{ stateInstance: StateInstance }>;

const login = async (req: LoginRequest) => {
  return axios.get<{}, LoginResponse>(
    `${API_URL}/waInstance${req.idInstance}/getStateInstance/${req.apiTokenInstance}`
  );
};

type LogoutRequest = WithAuth;
type LogoutResponse = AxiosResponse<{ isLogout: boolean }>;

const logout = async (req: LogoutRequest) => {
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
  return axios.get<{}, ReceiveNotificationResponse>(
    `${API_URL}/waInstance${req.idInstance}/receiveNotification/${req.apiTokenInstance}?receiveTimeout=5`
  );
};

type DeleteNotificationRequest = WithAuth & {
  receiptId: number;
};
type DeleteNotificationResponse = AxiosResponse;

const deleteNotification = async (req: DeleteNotificationRequest) => {
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
