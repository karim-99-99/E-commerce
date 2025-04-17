import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Service from "./components/Service";
import About from "./components/About";
import Registeration from "./RegisterationForm/Registeration";
import AddItem from "./RegisterationForm/AddItem";
import PhotoUpload from "./components/PhotoUpload";
import UploadPhoto from "./Features/UploadPhoto";
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
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
          <Route path="/photo" element={<UploadPhoto />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
