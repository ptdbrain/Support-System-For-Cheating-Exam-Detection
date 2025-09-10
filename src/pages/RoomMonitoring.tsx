import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext';
import CameraPreview from '../components/monitoring/CameraPreview';
import BackButton from '../components/common/BackButton';
import AddCameraModal from '../components/common/AddCameraModal';
import './RoomMonitoring.css';

function RoomMonitoring(): JSX.Element {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { examRooms, getAlertLevel, addCamera, deleteCameras } = useProctoring();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  
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
    if (isDeleteMode) {
      setSelectedCameras(prev => 
        prev.includes(cameraId) 
          ? prev.filter(id => id !== cameraId)
          : [...prev, cameraId]
      );
    } else {
      navigate(`/room/${roomId}/camera/${cameraId}`);
    }
  };

  const handleAddCamera = (): void => {
    setIsAddModalOpen(true);
  };

  const handleDeleteCameras = (): void => {
    if (selectedCameras.length > 0 && roomId) {
      if (confirm(`Are you sure you want to delete ${selectedCameras.length} camera(s)?`)) {
        deleteCameras(roomId, selectedCameras);
        setSelectedCameras([]);
        setIsDeleteMode(false);
      }
    }
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedCameras([]);
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
          <div className="camera-actions">
            <button className="add-camera-button" onClick={handleAddCamera}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Camera
            </button>
            <button 
              className={`delete-camera-button ${isDeleteMode ? 'active' : ''}`} 
              onClick={handleToggleDeleteMode}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3V2C6 1.45 6.45 1 7 1H9C9.55 1 10 1.45 10 2V3H12C12.55 3 13 3.45 13 4S12.55 5 12 5H11V13C11 14.1 10.1 15 9 15H7C5.9 15 5 14.1 5 13V5H4C3.45 5 3 4.55 3 4S3.45 3 4 3H6ZM8 2V3H8V2ZM7 5V13H9V5H7Z" fill="currentColor"/>
              </svg>
              {isDeleteMode ? 'Cancel' : 'Delete'}
            </button>
            {isDeleteMode && selectedCameras.length > 0 && (
              <button className="confirm-delete-camera-button" onClick={handleDeleteCameras}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.707 4.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L7 9.586l5.293-5.293a1 1 0 011.414 0z" fill="currentColor"/>
                </svg>
                Delete {selectedCameras.length}
              </button>
            )}
          </div>
        </div>
        <div className="cameras-grid">
          {room.cameras.map((camera) => {
            // Since we removed student tracking, default to 'none' alert level
            const alertLevel = 'none';
            return (
              <CameraPreview
                key={camera.id}
                camera={camera}
                alertLevel={alertLevel}
                onClick={() => handleCameraClick(camera.id)}
                isDeleteMode={isDeleteMode}
                isSelected={selectedCameras.includes(camera.id)}
              />
            );
          })}
        </div>
      </div>
      
      <AddCameraModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCamera={(camera) => roomId && addCamera(roomId, camera)}
        existingCameras={room.cameras}
        roomName={room.name}
      />
    </div>
  );
}

export default RoomMonitoring;
