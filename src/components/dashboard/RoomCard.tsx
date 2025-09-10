import { RoomCardProps } from '../../types/index';
import './RoomCard.css';

function RoomCard({ room, onClick, isDeleteMode = false, isSelected = false }: RoomCardProps): JSX.Element {
  return (
    <div className={`room-card ${isDeleteMode ? 'delete-mode' : ''} ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {isDeleteMode && (
        <div className="room-checkbox">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onClick();
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="room-card-header">
        <h3 className="room-name">{room.name}</h3>
        <span className={`status-badge ${room.status}`}>
          {room.status.toUpperCase()}
        </span>
      </div>
      
      <div className="room-card-body">
        <div className="room-stats">
          <div className="stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-value">{room.studentsCount}</span>
            <span className="stat-label">Slots</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">📹</span>
            <span className="stat-value">{room.cameras.length}</span>
            <span className="stat-label">Cameras</span>
          </div>
        </div>
        
        <div className="camera-list">
          <h4>Active Cameras:</h4>
          <div className="cameras">
            {room.cameras.map((camera, index) => (
              <span key={camera.id} className="camera-tag">
                {camera.name}
                {index < room.cameras.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="room-card-footer">
        <button className="monitor-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C4.5 2 1.73 4.11 1 7.5C1.73 10.89 4.5 13 8 13C11.5 13 14.27 10.89 15 7.5C14.27 4.11 11.5 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Monitor Room
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
