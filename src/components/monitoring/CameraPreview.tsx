import { CameraPreviewProps } from '../../types/index.js';
import './CameraPreview.css';

function CameraPreview({ camera, alertLevel, onClick }: CameraPreviewProps): JSX.Element {
  return (
    <div className={`camera-preview ${alertLevel !== 'none' ? `alert-${alertLevel}` : ''}`} onClick={onClick}>
      <div className="camera-header">
        <h3 className="camera-name">{camera.name}</h3>
        {alertLevel !== 'none' && (
          <div className={`alert-indicator ${alertLevel}`}>
            <span className="alert-dot"></span>
            {alertLevel === 'red' ? 'HIGH' : 'CAUTION'}
          </div>
        )}
      </div>
      
      <div className="camera-feed">
        <div className="video-placeholder">
          <div className="video-overlay">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 14L30 22V18C30 16.9 29.1 16 28 16H8C6.9 16 6 16.9 6 18V30C6 31.1 6.9 32 8 32H28C29.1 32 30 31.1 30 30V26L42 34V14Z" fill="currentColor"/>
            </svg>
            <span>Live Feed</span>
          </div>
        </div>
      </div>
      
      <div className="camera-info">
        <div className="student-info">
          <span className="student-name">{camera.studentName}</span>
          <span className="student-id">ID: {camera.studentId}</span>
        </div>
        
        <div className="camera-status">
          <span className="status-dot active"></span>
          <span>Live</span>
        </div>
      </div>
      
      <div className="camera-actions">
        <button className="view-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C4.5 2 1.73 4.11 1 7.5C1.73 10.89 4.5 13 8 13C11.5 13 14.27 10.89 15 7.5C14.27 4.11 11.5 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View Full Screen
        </button>
      </div>
    </div>
  );
}

export default CameraPreview;
