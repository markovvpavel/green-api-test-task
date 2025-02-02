import { useAppDispatch } from "@/app/store";
import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { setIsAuthenticated } from "@/slices/auth";
import { InputChangeEvent } from "@/types";
import { handleError } from "@/utils/handleError";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Cookies from "js-cookie";
import api from "@/app/api";

export const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });

  const handleChange = useCallback(
    (e: InputChangeEvent) =>
      setForm((s) => ({ ...s, [e.target.name]: e.target.value })),
    []
  );

  const handleLogin = useCallback(async () => {
    const statuses = {
      authorized: {
        message: "Инстанс авторизован",
        action: function () {
          Cookies.set(COOKIE_KEYS.ID_INSTANCE, form.idInstance);
          Cookies.set(COOKIE_KEYS.API_TOKEN_INSTANCE, form.apiTokenInstance);
          dispatch(setIsAuthenticated(true));
          toast.success(this.message);
          navigate("/");
        },
      },
      notAuthorized: {
        message: "Инстанс не авторизован",
        action: function () {
          toast.error(this.message);
        },
      },
      blocked: {
        message: "Инстанс забанен",
        action: function () {
          toast.error(this.message);
        },
      },
      sleepMode: {
        message:
          "Инстанс ушел в спящий режим. Состояние возможно, когда выключен телефон. После включения телефона может потребоваться до 5 минут для перехода состояния инстанса в значение authorized",
        action: function () {
          toast.warn(this.message);
        },
      },
      starting: {
        message:
          "Инстанс в процессе запуска (сервисный режим). Происходит перезагрузка инстанса, сервера или инстанс в режиме обслуживания. Может потребоваться до 5 минут для перехода состояния инстанса в значение authorized",
        action: function () {
          toast.warn(this.message);
        },
      },
      yellowCard: {
        message:
          "На инстансе частично или полностью приостановлена отправка сообщений из-за спамерской активности. Сообщения отправленные после получения статуса хранятся в очереди к отправке 24 часа. Для продолжения работы инстанса требуется сделать перезагрузку инстанса",
        action: function () {
          toast.warn(this.message);
        },
      },
    };

    try {
      const response = await api.login({ ...form });
      const { stateInstance } = response.data;
      const status = statuses[stateInstance];

      if (!status) {
        toast.error("Unknown state");
        return;
      }

      status.action();
    } catch (error) {
      handleError(error);
    }
  }, [form, dispatch, navigate]);

  return (
    <form className="h-fit w-full">
      <h4 className="text-[#61C554] text-[20px] mb-[50px] uppercase font-bold">
        Green-API
      </h4>

      <h2 className="text-[36px] mb-[8px]">Добро пожаловать</h2>
      <h2 className="mb-[48px]">Для начала введите ваши данные ниже.</h2>

      <div className="flex flex-col w-full">
        <label className="mb-[8px] text-[14px]" htmlFor="idInstance">
          ID Instance:
        </label>
        <Input
          name="idInstance"
          placeholder="4505284768"
          type="text"
          value={form.idInstance}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-full mt-[20px]">
        <label className="mb-[8px] text-[14px]" htmlFor="apiTokenInstance">
          API Token Instance:
        </label>
        <Input
          name="apiTokenInstance"
          type="password"
          value={form.apiTokenInstance}
          onChange={handleChange}
        />
      </div>

      <Button className="mt-[20px] w-full" onClick={handleLogin}>
        Войти
      </Button>
    </form>
  );
};
