import React from 'react';
import {Routes, Route} from 'react-router-dom';

import LoginPage from './components/LoginPage/loginPage';
import HomePage from './components/HomePage/homePage';
import RegisterPage from './components/RegisterPage/registerPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
