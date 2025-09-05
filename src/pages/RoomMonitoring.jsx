import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext.jsx';
import CameraPreview from '../components/monitoring/CameraPreview.jsx';
import BackButton from '../components/common/BackButton.jsx';
import './RoomMonitoring.css';

function RoomMonitoring() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { examRooms, getAlertLevel } = useProctoring();
  
  const room = examRooms.find(r => r.id === roomId);
  
  if (!room) {
    return (
      <div className="room-monitoring error">
        <h2>Room Not Found</h2>
        <p>The requested examination room could not be found.</p>
        <BackButton onClick={() => navigate('/')} />
      </div>
    );
  }

  const handleCameraClick = (cameraId) => {
    navigate(`/room/${roomId}/camera/${cameraId}`);
  };

  return (
    <div className="room-monitoring">
      <div className="monitoring-header">
        <BackButton onClick={() => navigate('/')} />
        <div className="room-info">
          <h1>{room.name}</h1>
          <div className="room-stats">
            <span className="stat">
              <strong>Students:</strong> {room.studentsCount}
            </span>
            <span className="stat">
              <strong>Status:</strong> 
              <span className={`status ${room.status}`}>{room.status.toUpperCase()}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="camera-previews">
        <h2>Camera Feeds</h2>
        <div className="cameras-grid">
          {room.cameras.map((camera) => {
            const alertLevel = getAlertLevel(camera.studentId);
            return (
              <CameraPreview
                key={camera.id}
                camera={camera}
                alertLevel={alertLevel}
                onClick={() => handleCameraClick(camera.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoomMonitoring;
