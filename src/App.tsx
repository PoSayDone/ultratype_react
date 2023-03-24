import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './views/Main'
import Header from './components/Header'

function App() {
    return (
      <>
      <div className="container">
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      </>
    )
}

export default App
