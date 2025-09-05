import { ProctoringPanelProps } from '../../types/index.js';
import './ProctoringPanel.css';

function ProctoringPanel({ 
  student, 
  behaviorData, 
  alertLevel, 
  isRecording, 
  onNotifySuspicious, 
  onRecordBehavior 
}: ProctoringPanelProps): JSX.Element {
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="proctoring-panel">
      <div className="panel-header">
        <h3>Proctoring Tools</h3>
        <div className={`alert-status ${alertLevel}`}>
          {alertLevel === 'red' && (
            <>
              <span className="alert-icon">🚨</span>
              <span>HIGH ALERT</span>
            </>
          )}
          {alertLevel === 'orange' && (
            <>
              <span className="alert-icon">⚠️</span>
              <span>CAUTION</span>
            </>
          )}
          {alertLevel === 'none' && (
            <>
              <span className="alert-icon">✅</span>
              <span>NORMAL</span>
            </>
          )}
        </div>
      </div>

      <div className="student-summary">
        <h4>Student Information</h4>
        <div className="summary-item">
          <span className="label">Name:</span>
          <span className="value">{student.name}</span>
        </div>
        <div className="summary-item">
          <span className="label">ID:</span>
          <span className="value">{student.id}</span>
        </div>
        <div className="summary-item">
          <span className="label">Suspicious Behaviors:</span>
          <span className={`value count ${alertLevel}`}>{behaviorData.count}</span>
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
        <h4>Recent Activity</h4>
        <div className="log-container">
          {behaviorData.events.length === 0 ? (
            <div className="no-events">
              <p>No events recorded yet.</p>
            </div>
          ) : (
            <div className="events-list">
              {behaviorData.events
                .slice()
                .reverse()
                .slice(0, 10)
                .map((event) => (
                  <div key={event.id} className={`event-item ${event.type}`}>
                    <div className="event-header">
                      <span className={`event-type ${event.type}`}>
                        {event.type === 'suspicious' ? '⚠️' : '📹'}
                        {event.type === 'suspicious' ? 'Suspicious' : 'Recording'}
                      </span>
                      <span className="event-time">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </div>
                    <div className="event-description">
                      {event.description}
                    </div>
                  </div>
                ))}
            </div>
          )}
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
