import { AlertBannerProps } from '../../types/index.js';
import './AlertBanner.css';

function AlertBanner({ level, count, studentName }: AlertBannerProps): JSX.Element | null {
  if (level === 'none') return null;

  const getAlertMessage = () => {
    if (level === 'red') {
      return `HIGH ALERT: ${studentName} has ${count} suspicious behaviors recorded. Immediate attention required.`;
    }
    return `CAUTION: ${studentName} has ${count} suspicious behavior${count > 1 ? 's' : ''} recorded.`;
  };

  const getAlertIcon = () => {
    if (level === 'red') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" fill="currentColor"/>
          <path d="M10 6V10M10 14H10.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l7.5 13.3c.75 1.332-.213 2.98-1.742 2.98H2.5c-1.53 0-2.493-1.648-1.743-2.98l7.5-13.3z" fill="currentColor"/>
        <path d="M10 8v4M10 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className={`alert-banner ${level}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {getAlertIcon()}
        </div>
        <div className="alert-message">
          {getAlertMessage()}
        </div>
        <div className="alert-count">
          <span className="count-badge">{count}</span>
        </div>
      </div>
    </div>
  );
}

export default AlertBanner;
