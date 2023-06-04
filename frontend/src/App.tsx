import { BrowserRouter, Location, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Main from "./views/Main/Main";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./views/Settings/Settings";
import { useEffect, useState } from "react";
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
import LettersService from "./services/LettersService";
import { LettersActionTypes } from "./store/reducers/lettersReducer";
import { lettersConst } from "./constants/lettersConst";
import { WordsActionTypes } from "./store/reducers/wordsReducer";

function App() {
    const location = useLocation();
    const [lastVisitedTypingRoute, setLastVisitedTypingRoute] = useState<string>("/typing/learning");

    useEffect(() => {
        if (location.pathname.startsWith('/typing/')) {
            setLastVisitedTypingRoute(location.pathname);
        }
    }, [location]);

    const IsAuthenticated = useIsAuthenticated()
    const dispatch = useDispatch();

    useEffect(() => {
        if (IsAuthenticated()) {
            const fetchLetters = async () => {
                try {
                    const response = await LettersService.getLetters();
                    localStorage.setItem("userLetters", JSON.stringify(response.data.data))
                    dispatch({ type: LettersActionTypes.SET_LETTERS, payload: response.data.data })
                    dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
                }
                catch {
                }
            }
        }
        else {
            if (localStorage.getItem("userLetters") === null) {
                localStorage.setItem("userLetters", JSON.stringify(lettersConst))
                dispatch({ type: LettersActionTypes.SET_LETTERS, payload: lettersConst })
                dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
            }
        }
    }, [IsAuthenticated])

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
