// src/App.jsx
import React, { useEffect, useRef } from 'react'; // 1. Tambahkan useRef & useEffect
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'; // 2. Impor dari library BARU

import { asyncPreloadProcess } from './states/isPreload/action';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const {
    isPreload = true,
    loadingBar,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const ref = useRef(null); // 4. Buat ref untuk loading bar

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // Efek ini akan memantau perubahan state 'loadingBar' dari Redux
  useEffect(() => {
    // Pastikan ref-nya sudah ada
    if (ref.current) {
      // 'default' adalah key yang digunakan oleh library @dimasmds
      if (loadingBar.default > 0) {
        ref.current.continuousStart(); // Mulai loading bar
      } else {
        ref.current.complete(); // Selesaikan loading bar
      }
    }
  }, [loadingBar]); // Efek ini berjalan setiap kali 'loadingBar' berubah

  if (isPreload) {
    return null;
  }

  return (
    <Router>
      {/* 6. Tampilkan komponen library baru & hubungkan ref */}
      <LoadingBar color="#f11946" ref={ref} shadow={true} />

      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:threadId" element={<DetailPage />} />
            <Route path="/threads/new" element={<CreateThreadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;