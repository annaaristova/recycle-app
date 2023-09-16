import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import DonateOrRecycle from './pages/DonateOrRecycle';
import RecycleGuide from './pages/RecycleGuide';
import EligibleBeverageContainers from './pages/EligibleBeverageContainers';
import RedeemBeverageContainersForCRVRefund from './pages/RedeemBeverageContainersForCRVRefund';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="DonateOrRecycle" element={<DonateOrRecycle/>}/>
        <Route path="RecycleGuide" element={<RecycleGuide/>}/>
        <Route path="EligibleBeverageContainers" element={<EligibleBeverageContainers/>}/>
        <Route path="RedeemBeverageContainersForCRVRefund" element={<RedeemBeverageContainersForCRVRefund/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


