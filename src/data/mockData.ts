// Mock data for development - matches database structure
import { Camera, Room, RoomCamera, Incident, RoomWithCameras } from '../types/index';

// Cameras table data
export const mockCameras: Camera[] = [
  {
    id: 1,
    name: 'CAM 101-1',
    status: 'Online',
    streamUrl: 'rtsp://camera1.example.com/stream',
    note: 'Front view camera for Room 101'
  },
  {
    id: 2,
    name: 'CAM 101-2',
    status: 'Online',
    streamUrl: 'rtsp://camera2.example.com/stream',
    note: 'Back view camera for Room 101'
  },
  {
    id: 3,
    name: 'CAM 102-1',
    status: 'Recording',
    streamUrl: 'rtsp://camera3.example.com/stream',
    note: 'Primary camera for Room 102'
  },
  {
    id: 4,
    name: 'CAM 102-2',
    status: 'Offline',
    streamUrl: 'rtsp://camera4.example.com/stream',
    note: 'Secondary camera for Room 102 - maintenance required'
  },
  {
    id: 5,
    name: 'CAM 103-1',
    status: 'Online',
    streamUrl: 'rtsp://camera5.example.com/stream'
  },
  {
    id: 6,
    name: 'CAM 103-2',
    status: 'Online',
    streamUrl: 'rtsp://camera6.example.com/stream'
  },
  {
    id: 7,
    name: 'CAM 201-1',
    status: 'Error',
    streamUrl: 'rtsp://camera7.example.com/stream',
    note: 'Connection issues - needs IT support'
  },
  {
    id: 8,
    name: 'CAM 201-2',
    status: 'Online',
    streamUrl: 'rtsp://camera8.example.com/stream'
  }
];

// Rooms table data
export const mockRooms: Room[] = [
  {
    id: 1,
    name: 'Room 101',
    note: 'Main examination hall - capacity 80 students'
  },
  {
    id: 2,
    name: 'Room 102',
    note: 'Secondary examination room'
  },
  {
    id: 3,
    name: 'Room 103',
    note: 'Computer lab for digital exams'
  },
  {
    id: 4,
    name: 'Room 201',
    note: 'Upper floor examination room'
  },
  {
    id: 5,
    name: 'Room 202',
    note: 'Second upper floor examination room'
  }
];

// Rooms-Cameras junction table data
export const mockRoomCameras: RoomCamera[] = [
  {
    roomId: 1,
    cameraId: 1
  },
  {
    roomId: 1,
    cameraId: 2
  },
  {
    roomId: 2,
    cameraId: 3
  },
  {
    roomId: 2,
    cameraId: 4
  },
  {
    roomId: 3,
    cameraId: 5
  },
  {
    roomId: 3,
    cameraId: 6
  },
  {
    roomId: 4,
    cameraId: 7
  },
  {
    roomId: 5,
    cameraId: 8
  }
];

// Incidents table data
export const mockIncidents: Incident[] = [
  {
    id: 1,
    roomId: 1,
    incidentTime: new Date('2024-01-15T10:15:00Z'),
    description: 'Suspicious movement detected - student looking at neighboring paper',
    evidenceUrl: '/evidence/incident_1_video.mp4',
    status: 'Detected'
  },
  {
    id: 2,
    roomId: 1,
    incidentTime: new Date('2024-01-15T10:45:00Z'),
    description: 'Unauthorized device usage detected',
    evidenceUrl: '/evidence/incident_2_screenshot.png',
    status: 'Verified'
  },
  {
    id: 3,
    roomId: 2,
    incidentTime: new Date('2024-01-15T11:20:00Z'),
    description: 'Student leaving seat without permission',
    evidenceUrl: '/evidence/incident_3_video.mp4',
    status: 'Dismissed'
  },
  {
    id: 4,
    roomId: 3,
    incidentTime: new Date('2024-01-15T14:30:00Z'),
    description: 'Multiple students communicating during exam',
    evidenceUrl: '/evidence/incident_4_video.mp4',
    status: 'Detected'
  }
];

// Helper function to get rooms with their cameras
export function getRoomsWithCameras(): RoomWithCameras[] {
  return mockRooms.map(room => ({
    ...room,
    cameras: mockRoomCameras
      .filter(rc => rc.roomId === room.id)
      .map(rc => mockCameras.find(camera => camera.id === rc.cameraId)!)
      .filter(Boolean)
  }));
}



