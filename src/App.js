import './App.css';
import Navbar from './container/Navbar';
import Home from './container/Home';
import Signup from './container/Signup';
import {
  BrowserRouter as Router,
  Routes, // instead of Switches
  Route

} from "react-router-dom"
import Login from './container/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        </Routes>
        </Router> 
    </div>
  );
}

export default App;
