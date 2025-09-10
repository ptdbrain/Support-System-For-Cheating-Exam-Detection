import { useState } from 'react';
import { Camera } from '../../types/index';
import './AddCameraModal.css';

interface AddCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCamera: (camera: Camera) => void;
  existingCameras: Camera[];
  roomName: string;
}

function AddCameraModal({ isOpen, onClose, onAddCamera, existingCameras, roomName }: AddCameraModalProps): JSX.Element | null {
  const [cameraName, setCameraName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cameraName.trim()) {
      alert('Please enter a camera name');
      return;
    }

    // Generate unique camera ID
    const maxCamNumber = existingCameras.reduce((max, camera) => {
      const camNumber = parseInt(camera.name.split(' ')[1] || '0');
      return camNumber > max ? camNumber : max;
    }, 0);

    const newCamNumber = maxCamNumber + 1;
    const cameraId = `cam${newCamNumber}`;

    const newCamera: Camera = {
      id: cameraId,
      name: cameraName
    };

    onAddCamera(newCamera);
    
    // Reset form
    setCameraName('');
    onClose();
  };

  const handleClose = () => {
    setCameraName('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Camera to {roomName}</h2>
          <button className="close-button" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="cameraName">Camera Name:</label>
            <input
              type="text"
              id="cameraName"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
              placeholder="e.g., CAM 3"
              required
            />
          </div>

          <div className="form-info">
            <p>This camera will be added to the room for monitoring during the examination.</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Camera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCameraModal;
