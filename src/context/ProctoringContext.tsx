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
    {
      id: 'room-001',
      name: 'Computer Science Final Exam',
      status: 'active',
      studentsCount: 25,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-001', studentName: 'John Doe' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-002', studentName: 'Jane Smith' }
      ]
    },
    {
      id: 'room-002',
      name: 'Mathematics Midterm',
      status: 'active',
      studentsCount: 30,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-003', studentName: 'Mike Johnson' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-004', studentName: 'Sarah Wilson' }
      ]
    },
    {
      id: 'room-003',
      name: 'Physics Lab Assessment',
      status: 'active',
      studentsCount: 18,
      cameras: [
        { id: 'cam1', name: 'CAM 1', studentId: 'student-005', studentName: 'David Brown' },
        { id: 'cam2', name: 'CAM 2', studentId: 'student-006', studentName: 'Emily Davis' }
      ]
    }
  ],
  studentBehaviors: {
    'student-001': { count: 2, events: [] },
    'student-002': { count: 6, events: [] },
    'student-003': { count: 1, events: [] },
    'student-004': { count: 4, events: [] },
    'student-005': { count: 0, events: [] },
    'student-006': { count: 7, events: [] }
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
