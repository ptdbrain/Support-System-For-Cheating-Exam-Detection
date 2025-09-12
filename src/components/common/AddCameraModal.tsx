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
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = cameraName.trim();
    if (!trimmedName) {
      setErrorMessage('Please enter a camera name');
      return;
    }
    if (trimmedName.length > 255) {
      setErrorMessage('Camera name must be at most 255 characters');
      return;
    }

    // Generate unique camera ID
    const maxCameraId = existingCameras.reduce((max, camera) =>
      camera.id > max ? camera.id : max, 0
    );

    const newCamera: any = {
      // id: maxCameraId + 1,
      name: trimmedName,
      status: 'Offline',
      note: note || undefined
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('https://sharp-pure-goat.ngrok-free.app/api/camera/CreateCamera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCamera)
      });

      const contentType = response.headers.get('content-type') || '';
      const responseBody = contentType.includes('application/json') ? await response.json() : await response.text();

      if (!response.ok) {
        const apiMessage = typeof responseBody === 'object' && responseBody && 'message' in responseBody ? (responseBody as any).message : `Request failed with status ${response.status}`;
        setErrorMessage(String(apiMessage));
        return;
      }

      // Backend may wrap response
      const data = typeof responseBody === 'string' ? responseBody : responseBody;
      // Some APIs return { success, result, message }
      if (data && typeof data === 'object' && 'success' in data) {
        if (data.success === false) {
          setErrorMessage((data as any).message || 'Failed to add camera');
          return;
        }
        const result = (data as any).result ?? data;
        onAddCamera(result);
      } else {
        onAddCamera(data as any);
      }

      // Reset form and close only on success
      setCameraName('');
      setNote('');
      onClose();
    } catch (error: any) {
      setErrorMessage(error?.message || 'Network error while adding camera');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCameraName('');
    setNote('');
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
              maxLength={255}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cameraNote">Note (optional):</label>
            <textarea
              id="cameraNote"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional notes about this camera"
              rows={3}
            />
          </div>

          {errorMessage && (
            <div className="form-error" role="alert" style={{ color: '#d32f2f' }}>
              {errorMessage}
            </div>
          )}

          <div className="form-info">
            <p>This camera will be added to the room for monitoring during the examination.</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Adding…' : 'Add Camera'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCameraModal;
