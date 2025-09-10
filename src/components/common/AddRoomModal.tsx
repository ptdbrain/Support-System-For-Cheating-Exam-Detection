import { useState } from 'react';
import { ExamRoom } from '../../types/index';
import './AddRoomModal.css';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (room: ExamRoom) => void;
  existingRooms: ExamRoom[];
}

function AddRoomModal({ isOpen, onClose, onAddRoom, existingRooms }: AddRoomModalProps): JSX.Element | null {
  const [roomName, setRoomName] = useState('');
  const [floor, setFloor] = useState(1);
  const [studentsCount, setStudentsCount] = useState(80);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    // Generate unique room ID
    const maxRoomNumber = existingRooms
      .filter(room => room.floor === floor)
      .reduce((max, room) => {
        const roomNumber = parseInt(room.name.split(' ')[1] || '0');
        return roomNumber > max ? roomNumber : max;
      }, floor * 100);

    const newRoomNumber = maxRoomNumber + 1;
    const roomId = `room-${newRoomNumber}`;

    const newRoom: ExamRoom = {
      id: roomId,
      name: roomName,
      status: 'active',
      studentsCount,
      floor,
      cameras: []
    };

    onAddRoom(newRoom);
    
    // Reset form
    setRoomName('');
    setFloor(1);
    setStudentsCount(80);
    onClose();
  };

  const handleClose = () => {
    setRoomName('');
    setFloor(1);
    setStudentsCount(80);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Examination Room</h2>
          <button className="close-button" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g., Room 109"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="floor">Floor:</label>
            <select
              id="floor"
              value={floor}
              onChange={(e) => setFloor(parseInt(e.target.value))}
            >
              <option value={1}>Floor 1</option>
              <option value={2}>Floor 2</option>
              <option value={3}>Floor 3</option>
              <option value={4}>Floor 4</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="studentsCount">Student Capacity:</label>
            <input
              type="number"
              id="studentsCount"
              value={studentsCount}
              onChange={(e) => setStudentsCount(parseInt(e.target.value))}
              min="1"
              max="200"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoomModal;
