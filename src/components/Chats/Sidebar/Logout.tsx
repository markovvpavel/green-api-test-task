import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/Button";
import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { setIsAuthenticated } from "@/slices/auth";
import { handleError } from "@/utils/handleError";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "@/app/api";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    try {
      const idInstance = Cookies.get(COOKIE_KEYS.ID_INSTANCE);
      const apiTokenInstance = Cookies.get(COOKIE_KEYS.API_TOKEN_INSTANCE);

      if (!idInstance || !apiTokenInstance) return;

      const res = await api.logout({ idInstance, apiTokenInstance });

      const { isLogout } = res.data;

      if (!isLogout) throw new Error("Не удалось разлогинить инстанс");

      Cookies.remove(COOKIE_KEYS.ID_INSTANCE);
      Cookies.remove(COOKIE_KEYS.API_TOKEN_INSTANCE);
      dispatch(setIsAuthenticated(false));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }, [dispatch, navigate]);

  return <Button onClick={handleLogout}>Выйти</Button>;
};
