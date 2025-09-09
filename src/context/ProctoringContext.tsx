import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ExamRoom, StudentBehavior, AlertLevel, ProctoringContextType } from '../types/index.js';

const ProctoringContext = createContext<ProctoringContextType | undefined>(undefined);

// Action types
type ProctoringAction = 
  | { type: 'LOG_SUSPICIOUS_BEHAVIOR'; payload: { studentId: string; timestamp: string; description: string } }
  | { type: 'RECORD_BEHAVIOR'; payload: { studentId: string; timestamp: string } };

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
        { id: 'cam1', name: 'CAM 1', studentId: 'student-001', studentName: 'John Doe' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-002', studentName: 'Jane Smith' }
      ]
    },
    {
      id: 'room-102',
      name: 'Room 102',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-003', studentName: 'Mike Johnson' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-004', studentName: 'Sarah Wilson' }
      ]
    },
    {
      id: 'room-103',
      name: 'Room 103',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-005', studentName: 'David Brown' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-006', studentName: 'Emily Davis' }
      ]
    },
    {
      id: 'room-104',
      name: 'Room 104',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-007', studentName: 'Robert Taylor' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-008', studentName: 'Lisa Anderson' }
      ]
    },
    {
      id: 'room-105',
      name: 'Room 105',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-025', studentName: 'Andrew Walker' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-026', studentName: 'Michelle Hall' }
      ]
    },
    {
      id: 'room-106',
      name: 'Room 106',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-009', studentName: 'Michael Chen' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-010', studentName: 'Amanda White' }
      ]
    },
    {
      id: 'room-107',
      name: 'Room 107',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-021', studentName: 'Steven Clark' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-022', studentName: 'Laura Rodriguez' }
      ]
    },
    {
      id: 'room-108',
      name: 'Room 108',
      status: 'active',
      studentsCount: 80,
      floor: 1,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-023', studentName: 'Mark Turner' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-024', studentName: 'Jessica Lewis' }
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
        { id: 'cam1', name: 'CAM 1', studentId: 'student-011', studentName: 'James Wilson' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-012', studentName: 'Maria Garcia' }
      ]
    },
    {
      id: 'room-202',
      name: 'Room 202',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-013', studentName: 'Christopher Lee' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-014', studentName: 'Jennifer Miller' }
      ]
    },
    {
      id: 'room-203',
      name: 'Room 203',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-015', studentName: 'Daniel Martinez' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-016', studentName: 'Ashley Johnson' }
      ]
    },
    {
      id: 'room-204',
      name: 'Room 204',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-027', studentName: 'Brian Young' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-028', studentName: 'Karen King' }
      ]
    },
    {
      id: 'room-205',
      name: 'Room 205',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-017', studentName: 'Kevin Brown' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-018', studentName: 'Nicole Davis' }
      ]
    },
    {
      id: 'room-206',
      name: 'Room 206',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-019', studentName: 'Ryan Thompson' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-020', studentName: 'Rachel Moore' }
      ]
    },
    {
      id: 'room-207',
      name: 'Room 207',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-029', studentName: 'Gregory Scott' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-030', studentName: 'Samantha Green' }
      ]
    },
    {
      id: 'room-208',
      name: 'Room 208',
      status: 'active',
      studentsCount: 80,
      floor: 2,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-031', studentName: 'Nathan Adams' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-032', studentName: 'Stephanie Baker' }
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

  const value: ProctoringContextType = {
    ...state,
    logSuspiciousBehavior,
    recordBehavior,
    getAlertLevel
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
