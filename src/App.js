import React from 'react';
import './App.css';
import AdminPage from './Pages/AdminPage/AdminPage';
import {Routes, Route} from 'react-router-dom'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import SignUp from './Components/SignUp/SignUp';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AdminPage/>} />
        <Route path='/ForgetPassword' element={<ForgetPassword/>} />
        <Route path='/SignUp' element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
