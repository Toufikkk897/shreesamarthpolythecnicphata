import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Student,
  Subject,
  Attendance,
  Note,
  TimeTableEntry,
  ExamSchedule,
  Department,
  Semester
} from '../types';

interface Store {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  departments: Department[];
  semesters: Semester[];
  students: Student[];
  subjects: Subject[];
  attendance: Attendance[];
  notes: Note[];
  timeTable: TimeTableEntry[];
  examSchedule: ExamSchedule[];
  users: User[];
  
  currentDepartment: string | null;
  setCurrentDepartment: (departmentId: string | null) => void;
  currentSemester: string | null;
  setCurrentSemester: (semesterId: string | null) => void;
  
  addUser: (user: User) => void;
  addStudent: (student: Student) => void;
  addSubject: (subject: Subject) => void;
  markAttendance: (attendance: Attendance) => void;
  addNote: (note: Note) => void;
  addTimeTableEntry: (entry: TimeTableEntry) => void;
  addExamSchedule: (exam: ExamSchedule) => void;
  
  getStudentAttendance: (studentId: string, month: number, year: number) => number;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      currentUser: null,
      login: (email: string, password: string) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          if (user.departmentId) {
            get().setCurrentDepartment(user.departmentId);
          }
          if (user.semesterId) {
            get().setCurrentSemester(user.semesterId);
          }
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null, currentDepartment: null, currentSemester: null }),
      
      departments: [
        { id: 'mech', name: 'Mechanical Engineering', code: 'MECH' },
        { id: 'comp', name: 'Computer Engineering', code: 'COMP' },
        { id: 'civil', name: 'Civil Engineering', code: 'CIVIL' },
        { id: 'entc', name: 'Electronics & Communication', code: 'ENTC' },
      ],
      
      semesters: Array.from({ length: 6 }, (_, i) => ({
        id: `sem${i + 1}`,
        number: i + 1,
        departmentId: 'all'
      })),
      
      users: [
        {
          id: 'teacher1',
          email: 'teacher@example.com',
          password: 'password123',
          role: 'teacher',
          name: 'John Doe',
          departmentId: 'mech'
        }
      ],
      
      students: [],
      subjects: [],
      attendance: [],
      notes: [],
      timeTable: [],
      examSchedule: [],
      
      currentDepartment: null,
      setCurrentDepartment: (departmentId) => set({ currentDepartment: departmentId }),
      currentSemester: null,
      setCurrentSemester: (semesterId) => set({ currentSemester: semesterId }),
      
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      
      addStudent: (student) => set((state) => ({
        students: [...state.students, student]
      })),
      
      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, subject]
      })),
      
      markAttendance: (attendance) => set((state) => ({
        attendance: [...state.attendance, attendance]
      })),
      
      addNote: (note) => set((state) => ({
        notes: [...state.notes, note]
      })),
      
      addTimeTableEntry: (entry) => set((state) => ({
        timeTable: [...state.timeTable, entry]
      })),
      
      addExamSchedule: (exam) => set((state) => ({
        examSchedule: [...state.examSchedule, exam]
      })),
      
      getStudentAttendance: (studentId, month, year) => {
        const { attendance } = get();
        const monthAttendance = attendance.filter((a) => {
          const date = new Date(a.date);
          return date.getMonth() === month && date.getFullYear() === year && a.studentId === studentId;
        });
        
        if (monthAttendance.length === 0) return 0;
        
        const presentDays = monthAttendance.filter((a) => a.status === 'present').length;
        return (presentDays / monthAttendance.length) * 100;
      },
    }),
    {
      name: 'college-attendance-store',
    }
  )
);