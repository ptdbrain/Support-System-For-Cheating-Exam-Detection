# Online Examination Proctoring System

A professional web application built with React for real-time monitoring of online examinations, enabling proctors to track and record suspicious student behavior during exams.

## 🎯 Features

### Core Functionality
- **Multi-page Interface**: Navigate seamlessly between exam rooms and individual camera feeds
- **Real-time Monitoring**: Live camera feed previews and full-screen monitoring
- **Behavioral Tracking**: Log and track suspicious behaviors with timestamps
- **Alert System**: Visual indicators for students with concerning behavior patterns
- **Recording Capability**: Initiate video recordings of suspicious events
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Flow
1. **Exam Room Dashboard**: Overview of all active examination rooms
2. **Room Monitoring View**: Preview camera feeds within a specific room
3. **Live Proctoring Interface**: Full-screen monitoring with proctoring tools

### Alert System
- **🟢 Normal**: No suspicious behaviors recorded
- **🟠 Orange Alert**: Fewer than 5 suspicious behaviors
- **🔴 Red Alert**: 5 or more suspicious behaviors (immediate attention required)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.js & .css          # Application header
│   │   ├── BackButton.js & .css      # Navigation back button
│   │   └── AlertBanner.js & .css     # Alert notifications
│   ├── dashboard/
│   │   └── RoomCard.js & .css        # Exam room cards
│   ├── monitoring/
│   │   └── CameraPreview.js & .css   # Camera feed previews
│   └── proctoring/
│       ├── VideoStream.js & .css     # Live video stream
│       └── ProctoringPanel.js & .css # Proctoring tools sidebar
├── pages/
│   ├── ExamRoomDashboard.js & .css   # Main dashboard page
│   ├── RoomMonitoring.js & .css      # Room monitoring page
│   └── LiveProctoring.js & .css      # Live proctoring page
├── context/
│   └── ProctoringContext.js          # Global state management
├── styles/
│   ├── index.css                     # Global styles
│   └── App.css                       # App-level styles
├── App.js                            # Main app component
└── index.js                          # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd support-system-for-exam-cheating-detection
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design & UI

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray shades for text and backgrounds

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- **Responsive**: Scales appropriately across different screen sizes

### Components
- **Modern Cards**: Clean, shadow-enhanced cards with hover effects
- **Gradient Buttons**: Eye-catching call-to-action buttons
- **Status Indicators**: Animated dots and badges for real-time status
- **Professional Layout**: Grid-based responsive layouts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted layouts for touch interaction
- **Mobile**: Streamlined interface for smaller screens

## 🔧 State Management

Uses React Context API for global state management:
- **Exam Rooms**: Mock data for demonstration
- **Student Behaviors**: Tracking suspicious behavior counts
- **Alert System**: Real-time alert level calculations
- **Event Logging**: Timestamped behavior events

## 🎭 Mock Data

The application includes realistic mock data:
- 3 active examination rooms
- 6 students with varying behavior patterns
- Sample camera feeds and student information
- Pre-populated behavior events for demonstration

## 🔮 Future Enhancements

### Planned Features
- **Real Video Integration**: Connect to actual camera feeds
- **Database Integration**: Persistent data storage
- **User Authentication**: Secure login for proctors
- **Advanced Analytics**: Behavior pattern analysis
- **Export Functionality**: Generate reports and recordings
- **Multi-language Support**: Internationalization
- **Dark Mode**: Alternative color scheme
- **Keyboard Shortcuts**: Power user features

### Technical Improvements
- **WebRTC Integration**: Real-time video streaming
- **WebSocket Support**: Live updates and notifications
- **Progressive Web App**: Offline functionality
- **Performance Optimization**: Code splitting and lazy loading

## 🛡️ Security Considerations

For production deployment, consider:
- Secure video stream transmission
- User authentication and authorization
- Data encryption for sensitive information
- GDPR compliance for student data
- Audit trails for proctoring actions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request