// Mock data for development - replace with API calls when integrating with backend
import { ExamRoom, StudentBehavior } from '../types/index';

export const mockExamRooms: ExamRoom[] = [
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
  // {
  //   id: 'room-206',
  //   name: 'Room 206',
  //   status: 'active',
  //   studentsCount: 80,
  //   floor: 2,
  //   cameras: [
  //     { id: 'cam1', name: 'CAM 1' },
  //     { id: 'cam2', name: 'CAM 2' }
  //   ]
  // },
  // {
  //   id: 'room-207',
  //   name: 'Room 207',
  //   status: 'active',
  //   studentsCount: 80,
  //   floor: 2,
  //   cameras: [
  //     { id: 'cam1', name: 'CAM 1' },
  //     { id: 'cam2', name: 'CAM 2' }
  //   ]
  // },
  // {
  //   id: 'room-208',
  //   name: 'Room 208',
  //   status: 'active',
  //   studentsCount: 80,
  //   floor: 2,
  //   cameras: [
  //     { id: 'cam1', name: 'CAM 1' },
  //     { id: 'cam2', name: 'CAM 2' }
  //   ]
  // }
];

export const mockStudentBehaviors: Record<string, StudentBehavior> = {
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
};

