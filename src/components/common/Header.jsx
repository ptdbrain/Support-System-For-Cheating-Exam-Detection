import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <h1>ProctorWatch</h1>
          <span className="tagline">Online Examination Monitoring System</span>
        </div>
        <div className="header-actions">
          <div className="status-indicator">
            <span className="status-dot active"></span>
            <span>System Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
