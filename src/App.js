import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
