import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export function Subjects() {
  const { subjects, isTeacher, addSubject } = useStore();
  const [newSubject, setNewSubject] = useState({ name: '', code: '', teacher: '' });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;
    
    addSubject({
      id: Date.now().toString(),
      ...newSubject
    });
    setNewSubject({ name: '', code: '', teacher: '' });
  };

  return (
    <div className="space-y-6">
      {isTeacher && (
        <form onSubmit={handleAddSubject} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Subject Code"
              value={newSubject.code}
              onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={newSubject.teacher}
              onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Subject
          </button>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Subjects List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{subject.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{subject.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}