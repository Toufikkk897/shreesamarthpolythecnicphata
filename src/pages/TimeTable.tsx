import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

export function TimeTable() {
  const { timeTable, subjects, isTeacher, addTimeTableEntry } = useStore();
  const [newEntry, setNewEntry] = useState({ day: '', time: '', subjectId: '' });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;
    
    addTimeTableEntry({
      id: Date.now().toString(),
      ...newEntry
    });
    setNewEntry({ day: '', time: '', subjectId: '' });
  };

  const getSubjectForSlot = (day: string, time: string) => {
    const entry = timeTable.find((e) => e.day === day && e.time === time);
    if (!entry) return null;
    return subjects.find((s) => s.id === entry.subjectId);
  };

  return (
    <div className="space-y-6">
      {isTeacher && (
        <form onSubmit={handleAddEntry} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add Time Table Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={newEntry.day}
              onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select Day</option>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={newEntry.time}
              onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select Time</option>
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <select
              value={newEntry.subjectId}
              onChange={(e) => setNewEntry({ ...newEntry, subjectId: e.target.value })}
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
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Entry
          </button>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Time Table</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TIMES.map((time) => (
              <tr key={time}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{time}</td>
                {DAYS.map((day) => {
                  const subject = getSubjectForSlot(day, time);
                  return (
                    <td key={day} className="px-6 py-4 whitespace-nowrap">
                      {subject ? (
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.teacher}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}