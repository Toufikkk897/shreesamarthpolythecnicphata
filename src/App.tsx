import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { DepartmentSelector } from './components/DepartmentSelector';
import { SemesterSelector } from './components/SemesterSelector';
import { Students } from './pages/Students';
import { Subjects } from './pages/Subjects';
import { TimeTable } from './pages/TimeTable';
import { ExamSchedule } from './pages/ExamSchedule';
import { Notes } from './pages/Notes';
import { useStore } from './store/useStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useStore();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const { currentUser, currentDepartment, currentSemester } = useStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                {currentUser?.role === 'teacher' && <DepartmentSelector />}
                {(currentUser?.role === 'teacher' || currentUser?.departmentId === currentDepartment) && (
                  <SemesterSelector />
                )}
                {((currentUser?.role === 'teacher') || 
                  (currentUser?.departmentId === currentDepartment && 
                   currentUser?.semesterId === currentSemester)) ? (
                  <Routes>
                    <Route path="/students" element={<Students />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/timetable" element={<TimeTable />} />
                    <Route path="/exams" element={<ExamSchedule />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/" element={<Navigate to="/students" replace />} />
                  </Routes>
                ) : (
                  <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {currentUser?.role === 'teacher' 
                        ? 'Please select a department and semester to continue'
                        : 'You can only access your department and semester'}
                    </h2>
                  </div>
                )}
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;