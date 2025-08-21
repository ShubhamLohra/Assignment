import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pipeline" element={<Pipeline />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
