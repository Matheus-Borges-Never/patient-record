import './style.scss';
import Register from '../components/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
