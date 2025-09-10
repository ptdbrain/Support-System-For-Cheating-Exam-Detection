import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ExamRoom, Camera, StudentBehavior, AlertLevel, ProctoringContextType } from '../types/index';

const ProctoringContext = createContext<ProctoringContextType | undefined>(undefined);

// Action types
type ProctoringAction = 
  | { type: 'LOG_SUSPICIOUS_BEHAVIOR'; payload: { studentId: string; timestamp: string; description: string } }
  | { type: 'RECORD_BEHAVIOR'; payload: { studentId: string; timestamp: string } }
  | { type: 'ADD_ROOM'; payload: { room: ExamRoom } }
  | { type: 'DELETE_ROOMS'; payload: { roomIds: string[] } }
  | { type: 'ADD_CAMERA'; payload: { roomId: string; camera: Camera } }
  | { type: 'DELETE_CAMERAS'; payload: { roomId: string; cameraIds: string[] } };

interface ProctoringState {
  examRooms: ExamRoom[];
  studentBehaviors: Record<string, StudentBehavior>;
}

// Initial state
const initialState: ProctoringState = {
  examRooms: [
    // Floor 1 Rooms
    {
      id: 'room-101',
      name: 'Room 101',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-102',
      name: 'Room 102',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-103',
      name: 'Room 103',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-104',
      name: 'Room 104',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-105',
      name: 'Room 105',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-106',
      name: 'Room 106',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-107',
      name: 'Room 107',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-108',
      name: 'Room 108',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    // Floor 2 Rooms
    {
      id: 'room-201',
      name: 'Room 201',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-202',
      name: 'Room 202',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-203',
      name: 'Room 203',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-204',
      name: 'Room 204',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-205',
      name: 'Room 205',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-206',
      name: 'Room 206',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-207',
      name: 'Room 207',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    },
    {
      id: 'room-208',
      name: 'Room 208',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1' },
        { id: 'cam2', name: 'CAM 2' }
      ]
    }
  ],
  studentBehaviors: {
    'student-001': { count: 2, events: [] },
    'student-002': { count: 6, events: [] },
    'student-003': { count: 1, events: [] },
    'student-004': { count: 4, events: [] },
    'student-005': { count: 0, events: [] },
    'student-006': { count: 7, events: [] },
    'student-007': { count: 3, events: [] },
    'student-008': { count: 0, events: [] },
    'student-009': { count: 2, events: [] },
    'student-010': { count: 5, events: [] },
    'student-011': { count: 1, events: [] },
    'student-012': { count: 0, events: [] },
    'student-013': { count: 4, events: [] },
    'student-014': { count: 6, events: [] },
    'student-015': { count: 2, events: [] },
    'student-016': { count: 0, events: [] },
    'student-017': { count: 1, events: [] },
    'student-018': { count: 3, events: [] },
    'student-019': { count: 0, events: [] },
    'student-020': { count: 5, events: [] },
    'student-021': { count: 2, events: [] },
    'student-022': { count: 0, events: [] },
    'student-023': { count: 1, events: [] },
    'student-024': { count: 4, events: [] },
    'student-025': { count: 0, events: [] },
    'student-026': { count: 3, events: [] },
    'student-027': { count: 2, events: [] },
    'student-028': { count: 0, events: [] },
    'student-029': { count: 1, events: [] },
    'student-030': { count: 6, events: [] },
    'student-031': { count: 0, events: [] },
    'student-032': { count: 2, events: [] }
  }
};


// Reducer
function proctoringReducer(state: ProctoringState, action: ProctoringAction): ProctoringState {
  switch (action.type) {
    case 'LOG_SUSPICIOUS_BEHAVIOR':
      const { studentId, timestamp, description } = action.payload;
      const currentBehavior = state.studentBehaviors[studentId] || { count: 0, events: [] };
      
      return {
        ...state,
        studentBehaviors: {
          ...state.studentBehaviors,
          [studentId]: {
            count: currentBehavior.count + 1,
            events: [
              ...currentBehavior.events,
              {
                id: Date.now(),
                type: 'suspicious',
                timestamp,
                description
              }
            ]
          }
        }
      };
      
    case 'RECORD_BEHAVIOR':
      const { studentId: recordStudentId, timestamp: recordTimestamp } = action.payload;
      const currentRecordBehavior = state.studentBehaviors[recordStudentId] || { count: 0, events: [] };
      
      return {
        ...state,
        studentBehaviors: {
          ...state.studentBehaviors,
          [recordStudentId]: {
            ...currentRecordBehavior,
            events: [
              ...currentRecordBehavior.events,
              {
                id: Date.now(),
                type: 'recording',
                timestamp: recordTimestamp,
                description: 'Video recording initiated'
              }
            ]
          }
        }
      };

    case 'ADD_ROOM':
      return {
        ...state,
        examRooms: [...state.examRooms, action.payload.room]
      };

    case 'DELETE_ROOMS':
      return {
        ...state,
        examRooms: state.examRooms.filter(room => !action.payload.roomIds.includes(room.id))
      };

    case 'ADD_CAMERA':
      return {
        ...state,
        examRooms: state.examRooms.map(room =>
          room.id === action.payload.roomId
            ? { ...room, cameras: [...room.cameras, action.payload.camera] }
            : room
        )
      };

    case 'DELETE_CAMERAS':
      return {
        ...state,
        examRooms: state.examRooms.map(room =>
          room.id === action.payload.roomId
            ? { ...room, cameras: room.cameras.filter(camera => !action.payload.cameraIds.includes(camera.id)) }
            : room
        )
      };
      
    default:
      return state;
  }
}

// Provider component
export function ProctoringProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(proctoringReducer, initialState);

  const logSuspiciousBehavior = (studentId: string, description: string = 'Suspicious behavior detected') => {
    dispatch({
      type: 'LOG_SUSPICIOUS_BEHAVIOR',
      payload: {
        studentId,
        timestamp: new Date().toISOString(),
        description
      }
    });
  };

  const recordBehavior = (studentId: string) => {
    dispatch({
      type: 'RECORD_BEHAVIOR',
      payload: {
        studentId,
        timestamp: new Date().toISOString()
      }
    });
  };

  const getAlertLevel = (studentId: string): AlertLevel => {
    const behaviorData = state.studentBehaviors[studentId];
    if (!behaviorData || behaviorData.count === 0) return 'none';
    if (behaviorData.count < 5) return 'orange';
    return 'red';
  };

  const addRoom = (room: ExamRoom) => {
    dispatch({ type: 'ADD_ROOM', payload: { room } });
  };

  const deleteRooms = (roomIds: string[]) => {
    dispatch({ type: 'DELETE_ROOMS', payload: { roomIds } });
  };

  const addCamera = (roomId: string, camera: Camera) => {
    dispatch({ type: 'ADD_CAMERA', payload: { roomId, camera } });
  };

  const deleteCameras = (roomId: string, cameraIds: string[]) => {
    dispatch({ type: 'DELETE_CAMERAS', payload: { roomId, cameraIds } });
  };

  const value: ProctoringContextType = {
    ...state,
    logSuspiciousBehavior,
    recordBehavior,
    getAlertLevel,
    addRoom,
    deleteRooms,
    addCamera,
    deleteCameras
  };

  return (
    <ProctoringContext.Provider value={value}>
      {children}
    </ProctoringContext.Provider>
  );
}

// Hook to use the context
export function useProctoring(): ProctoringContextType {
  const context = useContext(ProctoringContext);
  if (!context) {
    throw new Error('useProctoring must be used within a ProctoringProvider');
  }
  return context;
}
