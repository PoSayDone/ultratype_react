import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './views/Main'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {
    return (
      <>
      <BrowserRouter>
        <main>
          <Header/>
            <Routes>
              <Route path='/' element={<Main/>}/>
            </Routes>
        </main>
        <Navbar/>
      </BrowserRouter>
      </>
    )
}

export default App
