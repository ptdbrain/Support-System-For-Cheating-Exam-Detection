import { useParams, useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext.js';
import CameraPreview from '../components/monitoring/CameraPreview.js';
import BackButton from '../components/common/BackButton.js';
import './RoomMonitoring.css';

function RoomMonitoring(): JSX.Element {
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

  const handleCameraClick = (cameraId: string): void => {
    navigate(`/room/${roomId}/camera/${cameraId}`);
  };

  const handleAddCamera = (): void => {
    // TODO: Implement add camera functionality
    console.log('Add Camera clicked for room:', roomId);
  };

  return (
    <div className="room-monitoring">
      <div className="monitoring-header">
        <BackButton onClick={() => navigate('/')} />
        <div className="room-info">
          <h1>{room.name}</h1>
          <div className="room-stats">
            <span className="stat">
              <strong>Slots:</strong> {room.studentsCount}
            </span>
            <span className="stat">
              <strong>Status:</strong> 
              <span className={`status ${room.status}`}>{room.status.toUpperCase()}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="camera-previews">
        <div className="cameras-header">
          <h2>Camera Feeds</h2>
          <button className="add-camera-button" onClick={handleAddCamera}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Camera
          </button>
        </div>
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
