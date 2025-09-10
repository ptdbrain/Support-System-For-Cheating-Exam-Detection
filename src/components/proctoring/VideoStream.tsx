import { VideoStreamProps } from '../../types/index';
import './VideoStream.css';

function VideoStream({ camera, isRecording }: VideoStreamProps): JSX.Element {
  return (
    <div className="video-stream">
      <div className="video-container">
        <iframe
          src="http://localhost:8889/mystream"
          title="Live Video Stream"
          className="video-iframe"
          allowFullScreen
        />
          
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
