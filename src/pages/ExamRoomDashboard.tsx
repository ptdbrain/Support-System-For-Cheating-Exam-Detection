import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext';
import RoomCard from '../components/dashboard/RoomCard';
import AddRoomModal from '../components/common/AddRoomModal';
import './ExamRoomDashboard.css';

function ExamRoomDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { examRooms, addRoom, deleteRooms } = useProctoring();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const handleRoomClick = (roomId: string): void => {
    if (isDeleteMode) {
      setSelectedRooms(prev => 
        prev.includes(roomId) 
          ? prev.filter(id => id !== roomId)
          : [...prev, roomId]
      );
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  const handleAddRooms = (): void => {
    setIsAddModalOpen(true);
  };

  const handleDeleteRooms = (): void => {
    if (selectedRooms.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedRooms.length} room(s)?`)) {
        deleteRooms(selectedRooms);
        setSelectedRooms([]);
        setIsDeleteMode(false);
      }
    }
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedRooms([]);
  };

  // Group rooms by floor
  const roomsByFloor = examRooms.reduce((acc, room) => {
    if (!acc[room.floor]) {
      acc[room.floor] = [];
    }
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, typeof examRooms>);

  return (
    <div className="exam-room-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Examination Rooms Dashboard</h1>
            <p>Monitor active examination rooms and student activities</p>
          </div>
          <div className="header-actions">
            <button className="add-rooms-button" onClick={handleAddRooms}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Rooms
            </button>
            <button 
              className={`delete-button ${isDeleteMode ? 'active' : ''}`} 
              onClick={handleToggleDeleteMode}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H12C12.55 1 13 1.45 13 2V4H16C16.55 4 17 4.45 17 5S16.55 6 16 6H15V16C15 17.1 14.1 18 13 18H7C5.9 18 5 17.1 5 16V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H11V3H9ZM7 6V16H13V6H7Z" fill="currentColor"/>
              </svg>
              {isDeleteMode ? 'Cancel' : 'Delete'}
            </button>
            {isDeleteMode && selectedRooms.length > 0 && (
              <button className="confirm-delete-button" onClick={handleDeleteRooms}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                </svg>
                Delete {selectedRooms.length} Room(s)
              </button>
            )}
          </div>
        </div>
      </div>
      
      {Object.keys(roomsByFloor).length > 0 ? (
        Object.keys(roomsByFloor)
          .sort((a, b) => Number(a) - Number(b))
          .map((floor) => (
            <div key={floor} className="floor-section">
              <div className="floor-header">
                <h2>Floor {floor}</h2>
                <div className="floor-stats">
                  <span className="floor-info">
                    {roomsByFloor[Number(floor)].length} rooms • {' '}
                    {roomsByFloor[Number(floor)].filter(r => r.status === 'active').length} active
                  </span>
                </div>
              </div>
              <div className="rooms-grid">
                {roomsByFloor[Number(floor)].map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onClick={() => handleRoomClick(room.id)}
                    isDeleteMode={isDeleteMode}
                    isSelected={selectedRooms.includes(room.id)}
                  />
                ))}
              </div>
            </div>
          ))
      ) : (
        <div className="empty-state">
          <h2>No Examination Rooms</h2>
          <p>There are currently no examination rooms configured. Click "Add Rooms" to get started.</p>
        </div>
      )}
      
      <AddRoomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRoom={addRoom}
        existingRooms={examRooms}
      />
    </div>
  );
}

export default ExamRoomDashboard;
