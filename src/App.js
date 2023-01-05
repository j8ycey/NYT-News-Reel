import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import FrontPage from './frontPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

