import React from 'react';
import { useStore } from '../store/useStore';

export function DepartmentSelector() {
  const { departments, currentDepartment, setCurrentDepartment } = useStore();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Select Department</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setCurrentDepartment(dept.id)}
            className={`p-4 rounded-lg text-center transition-colors ${
              currentDepartment === dept.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <h3 className="font-semibold">{dept.name}</h3>
            <p className="text-sm opacity-75">{dept.code}</p>
          </button>
        ))}
      </div>
    </div>
  );
}