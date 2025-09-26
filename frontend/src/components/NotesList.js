import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No notes yet</h3>
        <p>Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotesList;