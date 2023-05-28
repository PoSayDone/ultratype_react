import { BrowserRouter, Location, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Main from "./views/Main/Main";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
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

    const lastKeyPressed = useState("")

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
                            element={
                                <Typing
                                    title="Обучение"
                                    subtitle="Клавиши f и j"
                                />
                            }
                        />
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
                    <F1Redirect />
                </AnimatePresence>
            </main>
            <Navbar language={t} />
        </>
    );
}

export default App;
