import './style.scss';
import Register from '../components/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
