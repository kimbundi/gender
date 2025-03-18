import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Reports from './pages/reports/Reports';
import Cases from './pages/cases/Cases';
import './App.css';  // Ensure App.css is imported
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Investigator from './pages/investigators/investigator';
import Listinvestigator from './pages/investigators/Listinvestigator';

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      {/* Main layout container */}
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/list" element={<Reports  url={url}/>} />
            <Route path="/cases" element={<Cases  url={url}/>} />
            <Route path="/investigate" element={<Investigator  url={url}/>} />
            <Route path="/listinvestigate" element={<Listinvestigator  url={url}/>} />


          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
