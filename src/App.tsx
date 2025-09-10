import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProctoringProvider } from './context/ProctoringContext';
import ExamRoomDashboard from './pages/ExamRoomDashboard';
import RoomMonitoring from './pages/RoomMonitoring';
import LiveProctoring from './pages/LiveProctoring';
import Header from './components/common/Header';
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
