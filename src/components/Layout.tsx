import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthPage } from "@/pages/Auth";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect, useState } from "react";
import { setIsAuthenticated } from "@/slices/auth";
import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { ChatsPage } from "@/pages/Chats";
import Cookies from "js-cookie";

export const Layout = () => {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idInstance = Cookies.get(COOKIE_KEYS.ID_INSTANCE);
    const apiTokenInstance = Cookies.get(COOKIE_KEYS.API_TOKEN_INSTANCE);

    if (idInstance && apiTokenInstance) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }

    setLoading(false);
  }, [dispatch]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {loading && (
        <div className="h-full w-full flex justify-center items-center">
          <span>Загрузка...</span>
        </div>
      )}
      {!loading && (
        <Router>
          <Routes>
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
            />

            <Route
              path="/"
              element={
                isAuthenticated ? <ChatsPage /> : <Navigate to="/auth" />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
