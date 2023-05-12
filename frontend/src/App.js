import './App.css';

import React, { useState, useEffect } from "react";
import 
{ BrowserRouter as Router,
   Routes, 
   Route,
} from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import AnalyzeCamera from './pages/CameraPage/AnalyzeCamera';
import FittingCamera from './pages/CameraPage/FittingCamera';
import ListPage from './pages/ListPage/ListPage';
import FaceAnalyze from './pages/Analyzepage/FaceAnalyze';
import MyPage from './pages/MyPage/MyPage';
import Detail from './pages/DetailPage/Detail'
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/analyze/camera" element={<AnalyzeCamera />}></Route>
          <Route path="/analyze/result" element={<FaceAnalyze />}></Route>
          <Route path="/product/camera" element={<FittingCamera />}></Route>
          <Route path="/list/:style" element={<ListPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/product" element={<Detail/>}></Route>
          <Route path="/user/signup" element={<RegisterPage />}></Route>
          <Route path="/user/login" element={<LoginPage />}></Route> 

        </Routes>
      </Router>
  )
}

export default App;