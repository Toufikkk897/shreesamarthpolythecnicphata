import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export function Notes() {
  const { notes, subjects, isTeacher, addNote } = useStore();
  const [newNote, setNewNote] = useState({ title: '', imageUrl: '', subjectId: '' });
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTeacher) return;
    
    addNote({
      id: Date.now().toString(),
      date: selectedDate,
      ...newNote
    });
    setNewNote({ title: '', imageUrl: '', subjectId: '' });
  };

  return (
    <div className="space-y-6">
      {isTeacher && (
        <form onSubmit={handleAddNote} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Note</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <select
              value={newNote.subjectId}
              onChange={(e) => setNewNote({ ...newNote, subjectId: e.target.value })}
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
              type="url"
              placeholder="Image URL"
              value={newNote.imageUrl}
              onChange={(e) => setNewNote({ ...newNote, imageUrl: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Note
          </button>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Class Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const subject = subjects.find((s) => s.id === note.subjectId);
            return (
              <div key={note.id} className="border rounded-lg overflow-hidden">
                <img
                  src={note.imageUrl}
                  alt={note.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                  <p className="text-gray-600">Subject: {subject?.name}</p>
                  <p className="text-gray-600">Date: {format(new Date(note.date), 'PPP')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}