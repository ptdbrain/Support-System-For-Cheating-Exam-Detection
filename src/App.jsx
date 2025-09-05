import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProctoringProvider } from './context/ProctoringContext.jsx';
import ExamRoomDashboard from './pages/ExamRoomDashboard.jsx';
import RoomMonitoring from './pages/RoomMonitoring.jsx';
import LiveProctoring from './pages/LiveProctoring.jsx';
import Header from './components/common/Header.jsx';
import './styles/App.css';

function App() {
  return (
    <ProctoringProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ExamRoomDashboard />} />
              <Route path="/room/:roomId" element={<RoomMonitoring />} />
              <Route path="/room/:roomId/camera/:cameraId" element={<LiveProctoring />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProctoringProvider>
  );
}

export default App;
