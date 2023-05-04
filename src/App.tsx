import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Main from "./views/Main/Main";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Settings from "./views/Settings/Settings";
import { useEffect, useState } from "react";
import Typing from "./views/Typing/Typing";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Levels from "./views/Levels/Levels";
import Profile from "./views/Profile/Profile";
import { AnimatePresence } from 'framer-motion';


function App() {
    const theme = useTypedSelector(state => state.theme.theme)
    const { t, i18n } = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const language = useTypedSelector(state => state.language.language)

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
            <BrowserRouter>
                <main>
                    <Header />
                    <AnimatePresence>
                        <Routes>
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
                                path="/typing/"
                                element={
                                    <Typing
                                        title="Обучение"
                                        subtitle="Клавиши f и j"
                                    />
                                }
                            />
                            <Route
                                path="/levels"
                                element={
                                    <Levels
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                    />
                                }
                            />
                        </Routes>
                    </AnimatePresence>
                </main>
                <Navbar language={t} />
            </BrowserRouter>
        </>
    );
}

export default App;
