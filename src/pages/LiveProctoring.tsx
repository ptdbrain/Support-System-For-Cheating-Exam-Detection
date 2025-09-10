import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext';
import VideoStream from '../components/proctoring/VideoStream';
import ProctoringPanel from '../components/proctoring/ProctoringPanel';
import BackButton from '../components/common/BackButton';
import AlertBanner from '../components/common/AlertBanner';
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

  // Since we removed student tracking from cameras, use camera-based logic
  const alertLevel = 'none';
  const behaviorData = { count: 0, events: [] };

  const handleNotifySuspicious = (): void => {
    // Since no student tracking, we'll use camera id as reference
    console.log(`Suspicious behavior flagged for ${camera.name}`);
  };

  const handleRecordBehavior = (): void => {
    if (isRecording) {
      setIsRecording(false);
      console.log(`Recording stopped for ${camera.name}`);
    } else {
      setIsRecording(true);
      console.log(`Recording started for ${camera.name}`);
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
              id: camera.id,
              name: camera.name
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
