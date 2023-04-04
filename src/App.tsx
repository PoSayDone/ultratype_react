import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Main from "./views/Main";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Settings from "./views/Settings/Settings";
import { useEffect, useState } from "react";
import Typing from "./views/Typing/Typing";
import ThemeProvider from "./providers/ThemeProvider";
import Results from "./views/Results/Results";
import "./i18n";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "./hooks/useTypedSelector";

function App() {
    const [font, setFont] = useState(false); // true - моноширный, false - обычный
    const { t, i18n } = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

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
            <ThemeProvider>
                <BrowserRouter>
                    <main>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route
                                path="/settings"
                                element={
                                    <Settings
                                        text={t}
                                        font={font}
                                        setFont={setFont}
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
                                path="/results"
                                element={
                                    <Results
                                        errors={0}
                                        accuracyPercentage={0}
                                        wpm={0}
                                        total={0}
                                    />
                                }
                            />
                        </Routes>
                    </main>
                    <Navbar language={t} />
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
