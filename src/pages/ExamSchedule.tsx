import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export function ExamSchedule() {
  const { examSchedule, subjects, isTeacher, addExamSchedule } = useStore();
  const [newExam, setNewExam] = useState({
    subjectId: '',
    date: '',
    time: '',
    duration: '',
    venue: ''
  });

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;
    
    addExamSchedule({
      id: Date.now().toString(),
      ...newExam
    });
    setNewExam({
      subjectId: '',
      date: '',
      time: '',
      duration: '',
      venue: ''
    });
  };

  return (
    <div className="space-y-6">
      {isTeacher && (
        <form onSubmit={handleAddExam} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add Exam Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={newExam.subjectId}
              onChange={(e) => setNewExam({ ...newExam, subjectId: e.target.value })}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newExam.date}
              onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="time"
              value={newExam.time}
              onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 3 hours)"
              value={newExam.duration}
              onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={newExam.venue}
              onChange={(e) => setNewExam({ ...newExam, venue: e.target.value })}
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Exam
          </button>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Exam Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examSchedule.map((exam) => {
                const subject = subjects.find((s) => s.id === exam.subjectId);
                return (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{subject?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(exam.date), 'PPP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.venue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}