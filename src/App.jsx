
import './App.css'
import { BrowserRouter as Router , Route ,Routes } from 'react-router-dom'
import Home from './comapnents/Home'
import Sevice from "./comapnents/Service"
import About from "./comapnents/About"
import Registeration from './RegisterationForm/Registeration'
function App() {
  return (
    <>
      <div>
       <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Service' element={<Sevice />} />
          <Route path='/Service/*' element={<Registeration />} />
        </Routes>
       </Router>
      </div>
    </>
  )
}

export default App
