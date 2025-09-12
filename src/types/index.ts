// Common types for the proctoring system - matches database structure

// Database entity types
export interface Camera {
  id: number;
  name: string;
  status: 'Online' | 'Offline' | 'Recording' | 'Error';
  streamUrl?: string;
  note?: string;
}

export interface Room {
  id: number;
  name: string;
  note?: string;
}

export interface RoomCamera {
  roomId: number;
  cameraId: number;
}

export interface Incident {
  id: number;
  roomId?: number;
  incidentTime: Date;
  description?: string;
  evidenceUrl?: string;
  status: 'Detected' | 'Verified' | 'Dismissed';
}

// Extended types with relationships
export interface RoomWithCameras extends Room {
  cameras: Camera[];
}

export interface CameraWithRooms extends Camera {
  rooms: Room[];
}

export interface IncidentWithRoom extends Incident {
  room?: Room;
}

// Legacy types for backward compatibility
export interface ExamRoom {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  studentsCount: number;
  floor: number;
  cameras: Camera[];
}


export type AlertLevel = 'none' | 'orange' | 'red';


// Component prop types
export interface RoomCardProps {
  room: ExamRoom;
  onClick: () => void;
  isDeleteMode?: boolean;
  isSelected?: boolean;
}

export interface CameraPreviewProps {
  camera: Camera;
  alertLevel: AlertLevel;
  onClick: () => void;
  isDeleteMode?: boolean;
  isSelected?: boolean;
}

export interface AlertBannerProps {
  level: AlertLevel;
  count: number;
  incidentDescription?: string;
}

export interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export interface VideoStreamProps {
  camera: Camera;
  isRecording: boolean;
}

export interface ProctoringPanelProps {
  incident?: Incident;
  alertLevel: AlertLevel;
  isRecording: boolean;
  onNotifySuspicious: () => void;
  onRecordBehavior: () => void;
}
