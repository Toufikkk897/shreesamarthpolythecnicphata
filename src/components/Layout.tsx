import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Calendar, Clock, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isTeacher = useStore((state) => state.isTeacher);

  const navigation = [
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Subjects', href: '/subjects', icon: BookOpen },
    { name: 'Time Table', href: '/timetable', icon: Clock },
    { name: 'Exam Schedule', href: '/exams', icon: Calendar },
    { name: 'Notes', href: '/notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">EduTrack</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => useStore.getState().setIsTeacher(!isTeacher)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {isTeacher ? 'Switch to Student' : 'Switch to Teacher'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}