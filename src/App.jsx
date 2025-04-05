import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Service from "./components/Service";
import About from "./components/About";
import Registeration from "./RegisterationForm/Registeration";
import AddItem from "./RegisterationForm/addItem";
import Dinamic from "./dinamicList/Dinamic";
function App() {
  return (
    <div>
      <Router>
      {/* <Dinamic /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/*" element={<Registeration />} />
          <Route path="/AddItem" element={<AddItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
