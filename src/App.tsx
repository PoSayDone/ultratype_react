import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './views/Main'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Settings from './views/Settings/Settings'
import { useState } from 'react'
import Typing from './views/Typing/Typing'

function App() {

    const [theme, setTheme] = useState(true) //true - темная тема, false - светлая
    const [language, setLanguage] = useState(true) //true - русский , false - англ
    const [font, setFont] = useState(false) // true - моноширный, false - обычный

    return (
        <>
            <BrowserRouter>
                <main>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/settings' element={<Settings theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} font={font} setFont={setFont} />} />
                        <Route path='/typing/' element={<Typing title='Обучение' subtitle='Клавиши f и j' />} />
                    </Routes>
                </main>
                <Navbar language={language} />
            </BrowserRouter>
        </>
    )
}

export default App
