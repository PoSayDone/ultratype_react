import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './views/Main'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {
    return (
      <>
      <BrowserRouter>
        <div className="container">
          <Header/>
            <Routes>
              <Route path='/' element={<Main/>}/>
            </Routes>
        </div>
        <Navbar/>
      </BrowserRouter>
      </>
    )
}

export default App
