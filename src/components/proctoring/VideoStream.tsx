import { VideoStreamProps } from '../../types/index';
import './VideoStream.css';

function VideoStream({ camera, isRecording }: VideoStreamProps): JSX.Element {
  return (
    <div className="video-stream">
      <div className="video-container">
        <div className="video-placeholder">
          <div className="video-overlay">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56 18.67L40 29.33V24C40 21.79 38.21 20 36 20H12C9.79 20 8 21.79 8 24V40C8 42.21 9.79 44 12 44H36C38.21 44 40 42.21 40 40V34.67L56 45.33V18.67Z" fill="currentColor"/>
            </svg>
            <span>Live Camera Feed</span>
          </div>
          
          {isRecording && (
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span>RECORDING</span>
            </div>
          )}
          
          <div className="video-controls">
            <div className="control-item">
              <span className="status-dot active"></span>
              <span>Live</span>
            </div>
            <div className="control-item">
              <span>1080p</span>
            </div>
            <div className="control-item">
              <span>60fps</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="video-info">
        <div className="student-details">
          <h2>Camera: {camera.name}</h2>
          <p>Live Camera Feed</p>
        </div>
        
        <div className="stream-quality">
          <div className="quality-indicator good">
            <span className="quality-dot"></span>
            <span>Excellent Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoStream;
