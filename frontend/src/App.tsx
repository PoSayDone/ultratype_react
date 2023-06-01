import { BrowserRouter, Location, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import Main from "./views/Main/Main";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./views/Settings/Settings";
import { useCallback, useEffect, useState } from "react";
import Typing from "./views/Typing/Typing";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Profile from "./views/Profile/Profile";
import { AnimatePresence } from 'framer-motion';
import Login from "./views/Login/Login";
import Registration from "./views/Registration/Registration";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import F1Redirect from "./components/F1Redirect";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [lastVisitedTypingRoute, setLastVisitedTypingRoute] = useState<string>("/typing/learning");

    useEffect(() => {
        // проверяем, является ли текущий путь одним из роутов типинга
        if (location.pathname.startsWith('/typing/')) {
            setLastVisitedTypingRoute(location.pathname);
        }
    }, [location]);

    const IsAuthenticated = useIsAuthenticated()
    const dispatch = useDispatch();
    useEffect(() => {
        if (IsAuthenticated()) {
            dispatch({ type: "SET_USER", payload: JSON.parse(Cookies.get("_auth_state")!) })
        }
    }, [])

    const theme = useTypedSelector(state => state.settings.theme)
    const { t, i18n } = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const language = useTypedSelector(state => state.settings.language)

    useEffect(() => {
        switch (language) {
            case false:
                changeLanguage("en");
                break;
            case true:
                changeLanguage("ru");
        }
    }, [language]);

    return (
        <>
            <main>
                <Header />
                <AnimatePresence mode="wait">
                    <Routes key={location.pathname} location={location}>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/settings"
                            element={
                                <Settings
                                    text={t}
                                />
                            }
                        />
                        <Route
                            path="/typing"
                            element={<Navigate to={lastVisitedTypingRoute} replace />}
                        >
                        </Route>
                        <Route
                            path="/typing/:mode"
                            element={
                                <Typing />
                            }>
                        </Route>
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth
                                    loginPath={"/login"}
                                >
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Login
                                />
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <Registration
                                />
                            }
                        />
                    </Routes>
                </AnimatePresence>
                <F1Redirect />
            </main>
            <Navbar language={t} />
        </>
    );
}

export default App;
