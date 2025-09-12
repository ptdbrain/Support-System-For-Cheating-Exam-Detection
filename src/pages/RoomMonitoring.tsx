import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Fade } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';
import { RoomWithCameras, Camera } from '../types/index';
import { getRoomsWithCameras } from '../data/mockData';
import CameraPreview from '../components/monitoring/CameraPreview';
import BackButton from '../components/common/BackButton';
import AddCameraModal from '../components/common/AddCameraModal';
import './RoomMonitoring.css';

function RoomMonitoring(): JSX.Element {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomWithCameras[]>(getRoomsWithCameras());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
  
  const room = rooms.find(r => r.id === parseInt(roomId || '0'));
  
  if (!room) {
    return (
      <div className="room-monitoring error">
        <h2>Room Not Found</h2>
        <p>The requested examination room could not be found.</p>
        <BackButton onClick={() => navigate('/')} />
      </div>
    );
  }

  const handleCameraClick = (cameraId: number): void => {
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
      const roomIdNum = parseInt(roomId);
      if (confirm(`Are you sure you want to delete ${selectedCameras.length} camera(s)?`)) {
        setRooms(prevRooms => 
          prevRooms.map(room =>
            room.id === roomIdNum
              ? { ...room, cameras: room.cameras.filter(camera => !selectedCameras.includes(camera.id)) }
              : room
          )
        );
        setSelectedCameras([]);
        setIsDeleteMode(false);
      }
    }
  };

  const addCamera = (camera: Camera): void => {
    if (roomId) {
      const roomIdNum = parseInt(roomId);
      setRooms(prevRooms => 
        prevRooms.map(room =>
          room.id === roomIdNum
            ? { ...room, cameras: [...room.cameras, camera] }
            : room
        )
      );
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
              <strong>Cameras:</strong> {room.cameras.length}
            </span>
            {room.note && (
              <span className="stat">
                <strong>Note:</strong> {room.note}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="camera-previews">
        <div className="cameras-header">
          <div className="camera-actions">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCamera}
              sx={{
                backgroundColor: '#8CCDEB',
                color: '#0B1D51',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#5a9fd4' }
              }}
            >
              Add Camera
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleToggleDeleteMode}
              sx={{
                backgroundColor: '#ef4444',
                color: 'white',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#dc2626' }
              }}
            >
              {isDeleteMode ? 'Cancel' : 'Delete'}
            </Button>
            <Fade in={isDeleteMode && selectedCameras.length > 0}>
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                onClick={handleDeleteCameras}
                sx={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#dc2626' }
                }}
              >
                Delete {selectedCameras.length}
              </Button>
            </Fade>
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
        onAddCamera={addCamera}
        existingCameras={room.cameras}
        roomName={room.name}
      />
    </div>
  );
}

export default RoomMonitoring;
