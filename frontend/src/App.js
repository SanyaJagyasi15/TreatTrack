import './App.css';
import AddReceipt from './Pages/AddReceipt';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewReceipt from './Pages/ViewReceipt';
import EditReceipt from './Pages/EditReceipt';
import PrivateRoute from '../src/Components/PrivateRouter';
import Home from './Pages/Home';

import React, { useEffect } from 'react';
import WebSocketService from './Services/WebSocketService';

function App() {
  useEffect(() => {
    WebSocketService.connect();
    WebSocketService.addMessageHandler((message) => {

      console.log('Received notification:', message);
      
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/addreceipt" element={<AddReceipt />} />
          <Route path="/viewreceipt" element={<ViewReceipt />} />
          <Route path="/editreceipt/:index" element={<EditReceipt />} />
        </Route>
      </Routes>
     
    </Router>
  );
}

export default App;
