import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export function Students() {
  const { students, subjects, attendance, isTeacher, addStudent, markAttendance, getStudentAttendance } = useStore();
  const [newStudent, setNewStudent] = useState({ name: '', rollNumber: '', email: '' });
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;
    
    addStudent({
      id: Date.now().toString(),
      ...newStudent
    });
    setNewStudent({ name: '', rollNumber: '', email: '' });
  };

  const handleAttendance = (studentId: string, status: 'present' | 'absent') => {
    if (!isTeacher || !selectedSubject) return;
    
    markAttendance({
      id: Date.now().toString(),
      date: selectedDate,
      studentId,
      subjectId: selectedSubject,
      status
    });
  };

  return (
    <div className="space-y-6">
      {isTeacher && (
        <form onSubmit={handleAddStudent} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={newStudent.rollNumber}
              onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Student
          </button>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Students List</h2>
          {isTeacher && (
            <div className="flex space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded-md p-2"
              />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance %
                </th>
                {isTeacher && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.rollNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStudentAttendance(student.id, new Date().getMonth(), new Date().getFullYear()).toFixed(1)}%
                  </td>
                  {isTeacher && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAttendance(student.id, 'present')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleAttendance(student.id, 'absent')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Absent
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}