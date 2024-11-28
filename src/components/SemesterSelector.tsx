import React from 'react';
import { useStore } from '../store/useStore';

export function SemesterSelector() {
  const { semesters, currentDepartment, currentSemester, setCurrentSemester } = useStore();

  if (!currentDepartment) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Select Semester</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => setCurrentSemester(sem.id)}
            className={`p-4 rounded-lg text-center transition-colors ${
              currentSemester === sem.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <h3 className="font-semibold">Semester {sem.number}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}