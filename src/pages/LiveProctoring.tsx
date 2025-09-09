import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext.js';
import VideoStream from '../components/proctoring/VideoStream.js';
import ProctoringPanel from '../components/proctoring/ProctoringPanel.js';
import BackButton from '../components/common/BackButton.js';
import AlertBanner from '../components/common/AlertBanner.js';
import './LiveProctoring.css';

function LiveProctoring(): JSX.Element {
  const { roomId, cameraId } = useParams();
  const navigate = useNavigate();
  const { examRooms, getAlertLevel, logSuspiciousBehavior, recordBehavior, studentBehaviors } = useProctoring();
  const [isRecording, setIsRecording] = useState(false);
  
  const room = examRooms.find(r => r.id === roomId);
  const camera = room?.cameras.find(c => c.id === cameraId);
  
  if (!room || !camera) {
    return (
      <div className="live-proctoring error">
        <h2>Camera Not Found</h2>
        <p>The requested camera feed could not be found.</p>
        <BackButton onClick={() => navigate('/')} />
      </div>
    );
  }

  const alertLevel = getAlertLevel(camera.studentId);
  const behaviorData = studentBehaviors[camera.studentId] || { count: 0, events: [] };

  const handleNotifySuspicious = (): void => {
    logSuspiciousBehavior(camera.studentId, 'Suspicious behavior flagged by proctor');
  };

  const handleRecordBehavior = (): void => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, you would stop the actual recording here
    } else {
      setIsRecording(true);
      recordBehavior(camera.studentId);
      // In a real app, you would start the actual recording here
      // Auto-stop recording after 30 seconds for demo purposes
      setTimeout(() => {
        setIsRecording(false);
      }, 30000);
    }
  };

  return (
    <div className="live-proctoring">
      <div className="proctoring-header">
        <BackButton onClick={() => navigate(`/room/${roomId}`)} />
        <div className="camera-info">
          <h1>{room.name} - {camera.name}</h1>
        </div>
      </div>

      <div className="proctoring-content">
        <div className="video-section">
          <VideoStream 
            camera={camera} 
            isRecording={isRecording}
          />
        </div>
        
        <div className="sidebar">
          <ProctoringPanel
            student={{
              id: camera.studentId,
              name: camera.studentName
            }}
            behaviorData={behaviorData}
            alertLevel={alertLevel}
            isRecording={isRecording}
            onNotifySuspicious={handleNotifySuspicious}
            onRecordBehavior={handleRecordBehavior}
          />
        </div>
      </div>
    </div>
  );
}

export default LiveProctoring;
