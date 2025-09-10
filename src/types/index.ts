// Common types for the proctoring system

export interface Camera {
  id: string;
  name: string;
}

export interface ExamRoom {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  studentsCount: number;
  floor: number;
  cameras: Camera[];
}

export interface BehaviorEvent {
  id: number;
  type: 'suspicious' | 'recording';
  timestamp: string;
  description: string;
}

export interface StudentBehavior {
  count: number;
  events: BehaviorEvent[];
}

export interface Student {
  id: string;
  name: string;
}

export type AlertLevel = 'none' | 'orange' | 'red';

export interface ProctoringContextType {
  examRooms: ExamRoom[];
  studentBehaviors: Record<string, StudentBehavior>;
  logSuspiciousBehavior: (studentId: string, description?: string) => void;
  recordBehavior: (studentId: string) => void;
  getAlertLevel: (studentId: string) => AlertLevel;
  addRoom: (room: ExamRoom) => void;
  deleteRooms: (roomIds: string[]) => void;
  addCamera: (roomId: string, camera: Camera) => void;
  deleteCameras: (roomId: string, cameraIds: string[]) => void;
}

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
  studentName: string;
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
  student: Student;
  behaviorData: StudentBehavior;
  alertLevel: AlertLevel;
  isRecording: boolean;
  onNotifySuspicious: () => void;
  onRecordBehavior: () => void;
}
