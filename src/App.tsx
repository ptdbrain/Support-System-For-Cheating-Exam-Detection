import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ProctoringProvider } from './context/ProctoringContext';
import { theme } from './theme/theme';
import ExamRoomDashboard from './pages/ExamRoomDashboard';
import RoomMonitoring from './pages/RoomMonitoring';
import LiveProctoring from './pages/LiveProctoring';
import Sidebar from './components/common/Sidebar';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProctoringProvider>
        <Router>
          <Box 
            sx={{ 
              display: 'flex',
              minHeight: '100vh',
              backgroundColor: 'background.default'
            }}
          >
            <Sidebar />
            <Box 
              component="main" 
              sx={{ 
                flex: 1, 
                py: 3,
                px: { xs: 2, sm: 3, md: 4 },
                overflow: 'auto'
              }}
            >
              <Routes>
                <Route path="/" element={<ExamRoomDashboard />} />
                <Route path="/cameras" element={<div>Cameras Page (Coming Soon)</div>} />
                <Route path="/settings" element={<div>Settings Page (Coming Soon)</div>} />
                <Route path="/room/:roomId" element={<RoomMonitoring />} />
                <Route path="/room/:roomId/camera/:cameraId" element={<LiveProctoring />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ProctoringProvider>
    </ThemeProvider>
  );
}

export default App;
