import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/navigation";
import Event from "./pages/events";
import AddEvenet from "./pages/addEvents";
import Register from "./pages/registrasi";
import PelaksanaEvent from "./pages/pelaksanaEvent";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Navigation />
        </nav>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Event />} />
            <Route path="/events/add" element={<AddEvenet />} />
            <Route path="/pelaksana" element={<PelaksanaEvent />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
