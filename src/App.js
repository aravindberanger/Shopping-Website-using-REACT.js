
import {BrowserRouter, Routes, Route, Link, useHistory} from 'react-router-dom';
import './App1.css';
import './components/login.css';

import Login from './components/Login';
import Register from './components/Register';

import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import CreateProduct from './components/CreateProduct'; 
import EditProduct from './components/EditProduct'; 
import ListProduct from './components/ListProduct'; 


import CreateDel from './components/CreateDel';
import EditDel from './components/EditDel';
import ListDel from './components/ListDel';


import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false);

  const logout = () => {
    localStorage.setItem('token', null);
    setAuth(false)
  }
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="reg">
     
      
      <BrowserRouter>
        {}
        <Routes>
        <Route index element={<Login />} />
        
        <Route path="register" element={<Register />} />
          <Route path="user" element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
          <Route path="product" element={<ListProduct />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/:id/edit" element={<EditProduct />} />
          <Route path="delivery" element={<ListDel />} />
          <Route path="delivery/create" element={<CreateDel />} />
          <Route path="/delivery/:id/edit" element={<EditDel />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
