import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Donate_Recycle from './pages/Donate_Recycle'
import RecycleGuide from './pages/RecycleGuide';
import Redeem_Bev_Containers from './pages/Redeem_Bev_Containers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Donate_Recycle" element={<Donate_Recycle/>}/>
        <Route path="RecycleGuide" element={<RecycleGuide/>}/>
        <Route path="Redeem_Bev_Containers" element={<Redeem_Bev_Containers/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


