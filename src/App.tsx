import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProctoringProvider } from './context/ProctoringContext.js';
import ExamRoomDashboard from './pages/ExamRoomDashboard.js';
import RoomMonitoring from './pages/RoomMonitoring.js';
import LiveProctoring from './pages/LiveProctoring.js';
import Header from './components/common/Header.js';
import './styles/App.css';

function App(): JSX.Element {
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
