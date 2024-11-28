export interface User {
  id: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  name: string;
  departmentId: string;
  semesterId?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Semester {
  id: string;
  number: number;
  departmentId: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  departmentId: string;
  semesterId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  departmentId: string;
  semesterId: string;
}

export interface Attendance {
  id: string;
  date: string;
  studentId: string;
  subjectId: string;
  status: 'present' | 'absent';
}

export interface Note {
  id: string;
  date: string;
  subjectId: string;
  title: string;
  imageUrl: string;
}

export interface TimeTableEntry {
  id: string;
  day: string;
  time: string;
  subjectId: string;
  departmentId: string;
  semesterId: string;
}

export interface ExamSchedule {
  id: string;
  subjectId: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  departmentId: string;
  semesterId: string;
}