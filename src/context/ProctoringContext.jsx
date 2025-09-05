import React, { createContext, useContext, useReducer } from 'react';

const ProctoringContext = createContext();

// Initial state
const initialState = {
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

// Action types
const actionTypes = {
  LOG_SUSPICIOUS_BEHAVIOR: 'LOG_SUSPICIOUS_BEHAVIOR',
  RECORD_BEHAVIOR: 'RECORD_BEHAVIOR'
};

// Reducer
function proctoringReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOG_SUSPICIOUS_BEHAVIOR:
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
      
    case actionTypes.RECORD_BEHAVIOR:
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
export function ProctoringProvider({ children }) {
  const [state, dispatch] = useReducer(proctoringReducer, initialState);

  const logSuspiciousBehavior = (studentId, description = 'Suspicious behavior detected') => {
    dispatch({
      type: actionTypes.LOG_SUSPICIOUS_BEHAVIOR,
      payload: {
        studentId,
        timestamp: new Date().toISOString(),
        description
      }
    });
  };

  const recordBehavior = (studentId) => {
    dispatch({
      type: actionTypes.RECORD_BEHAVIOR,
      payload: {
        studentId,
        timestamp: new Date().toISOString()
      }
    });
  };

  const getAlertLevel = (studentId) => {
    const behaviorData = state.studentBehaviors[studentId];
    if (!behaviorData || behaviorData.count === 0) return 'none';
    if (behaviorData.count < 5) return 'orange';
    return 'red';
  };

  const value = {
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
export function useProctoring() {
  const context = useContext(ProctoringContext);
  if (!context) {
    throw new Error('useProctoring must be used within a ProctoringProvider');
  }
  return context;
}
