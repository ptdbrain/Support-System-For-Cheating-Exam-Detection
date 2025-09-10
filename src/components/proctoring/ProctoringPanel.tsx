import { ProctoringPanelProps } from '../../types/index';
import './ProctoringPanel.css';

function ProctoringPanel({ 
  student: _student, 
  behaviorData: _behaviorData, 
  alertLevel: _alertLevel, 
  isRecording, 
  onNotifySuspicious, 
  onRecordBehavior 
}: ProctoringPanelProps): JSX.Element {
  // formatTimestamp function removed as it's not used in current implementation

  return (
    <div className="proctoring-panel">
      <div className="panel-header">
        <h3>Proctoring Tools</h3>
      </div>

      <div className="student-summary">
        <h4>AI Detection</h4>
        <div className="summary-item">
          <span className="label">Status:</span>
          <span className="value">Waiting for AI Model</span>
        </div>
        <div className="summary-item">
          <span className="label">Behavior Analysis:</span>
          <span className="value">Not Available</span>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-button suspicious"
          onClick={onNotifySuspicious}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Notify Suspicious Behavior
        </button>

        <button 
          className={`action-button record ${isRecording ? 'recording' : ''}`}
          onClick={onRecordBehavior}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <circle cx="10" cy="10" r="3" fill="currentColor"/>
          </svg>
          {isRecording ? 'Stop Recording' : 'Record Behavior'}
        </button>
      </div>

      <div className="behavior-log">
        <h4>AI Activity Log</h4>
        <div className="log-container">
          <div className="no-events">
            <p>AI behavior detection model not yet implemented.</p>
            <p>Events will appear here once AI analysis is active.</p>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <div className="monitoring-status">
          <span className="status-dot active"></span>
          <span>Monitoring Active</span>
        </div>
      </div>
    </div>
  );
}

export default ProctoringPanel;
