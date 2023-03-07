import React from 'react';
import { Routes, Route } from 'react-router-dom'


import './App.css';

import AdminPage from './Pages/AdminPage/AdminPage';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import SignUp from './Components/SignUp/SignUp';
import ComissionMainPage from './Pages/ComissionMainPage/ComissionMainPage';
import ComissionList from './Pages/ComissionList/ComissionList';
import Subscriber from './Pages/Subscriber/Subscriber';
import Order from './Pages/Order/Order';
import PercentCard from './Components/PercentCard/PercentCard';
import SubCard from './Components/SubCard/SubCard';
import OrderCard from './Components/OrderCard/OrderCard';
import PopUp from './Components/CommissionPopUp/PopUp';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AdminPage />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/ComissionMainPage' element={<ComissionMainPage />} />
        <Route path='/ComissionList' element={<ComissionList />} />
        <Route path='/Subscriber' element={<Subscriber />} />
        <Route path='/Order' element={<Order />} />
        <Route path='/PercentCard' element={<PercentCard />} />
        <Route path='/SubCard' element={<SubCard />} />
        <Route path='/OrderCard' element={<OrderCard />} />

        <Route path='/PopUp' element={<PopUp />} />
      </Routes>
    </div>
  );
}

export default App;
