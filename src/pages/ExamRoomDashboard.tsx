import { useNavigate } from 'react-router-dom';
import { useProctoring } from '../context/ProctoringContext.js';
import RoomCard from '../components/dashboard/RoomCard.js';
import './ExamRoomDashboard.css';

function ExamRoomDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { examRooms } = useProctoring();

  const handleRoomClick = (roomId: string): void => {
    navigate(`/room/${roomId}`);
  };

  const handleAddRooms = (): void => {
    // TODO: Implement add rooms functionality
    console.log('Add Rooms clicked');
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
        <h1>Examination Rooms Dashboard</h1>
        <p>Monitor active examination rooms and student activities</p>
        <button className="add-rooms-button" onClick={handleAddRooms}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Rooms
        </button>
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
    </div>
  );
}

export default ExamRoomDashboard;
