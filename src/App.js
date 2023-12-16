import React, { useState, createContext, useEffect } from 'react';
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ActiveOrderCard from './Components/OrderCard/ActiveOrderCard';
import CompletedOrderCard from './Components/OrderCard/CompletedOrderCard';
import ShopUsers from './Pages/users/ShopUsers';
import Categories from './Pages/Category/Categories';
import Banner from './Pages/Banner';
import DefaultProduct from './Pages/DefaultProduct';
export const ContextData = createContext();
function App() {
  const [userUid, setUserUid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    getAutherUserDetails();
  }, []);
  async function getAutherUserDetails(userValue) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        setUserUid(uid);
        setUserEmail(email)
      } else {
        setUserUid(userValue);
      }
    });
  }
  return (
    <>
      {
        !userUid ?
          <Routes>
            <Route path='/easycheez-admin/' element={<AdminPage />} />
            <Route path='/ForgetPassword' element={<ForgetPassword />} />
            <Route path='/SignUp' element={<SignUp />} />
          </Routes> :
          <div className="App">
            {
              userUid &&
              <ContextData.Provider value={{
                userUid: userUid,
                setUserUid: setUserUid,
                userEmail: userEmail,
                setUserEmail: setUserEmail

              }}>
                <Routes>
                  <Route path='/easycheez-admin/' element={<ComissionMainPage />} />
                  <Route path='/ComissionList' element={<ComissionList />} />
                  <Route path='/Subscriber' element={<Subscriber />} />
                  <Route path='/Order' element={<Order />} />
                  <Route path='/PercentCard' element={<PercentCard />} />
                  <Route path='/SubCard' element={<SubCard />} />
                  <Route path='/OrderCard' element={<OrderCard />} />
                  <Route path='/ActiveOrderCard' element={<ActiveOrderCard />} />
                  <Route path='/ComOrderCard' element={<CompletedOrderCard />} />
                  <Route path='/shopUsers' element={<ShopUsers />} />
                  <Route path='/Category' element={<Categories />} />
                  <Route path='/Banner' element={<Banner />} />
                  <Route path='/DefaultProduct' element={<DefaultProduct />} />



                </Routes>
              </ContextData.Provider>
            }
          </div>
      }
    </>
  );
}

export default App;
