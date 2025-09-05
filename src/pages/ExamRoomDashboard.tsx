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

  return (
    <div className="exam-room-dashboard">
      <div className="dashboard-header">
        <h1>Examination Rooms Dashboard</h1>
        <p>Monitor active examination rooms and student activities</p>
      </div>
      
      <div className="rooms-grid">
        {examRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>
      
      {examRooms.length === 0 && (
        <div className="empty-state">
          <h2>No Active Examination Rooms</h2>
          <p>There are currently no active examination rooms to monitor.</p>
        </div>
      )}
    </div>
  );
}

export default ExamRoomDashboard;
