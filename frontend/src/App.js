import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prompt from './pages/Prompt';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Prompt />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
