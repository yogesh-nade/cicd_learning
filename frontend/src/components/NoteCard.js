import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            onClick={() => onEdit(note)}
            className="edit-btn"
            aria-label="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(note._id)}
            className="delete-btn"
            aria-label="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="note-content">
        <p>{note.content}</p>
      </div>
      <div className="note-footer">
        <small className="note-date">
          Created: {formatDate(note.createdAt)}
          {note.updatedAt !== note.createdAt && (
            <span> • Updated: {formatDate(note.updatedAt)}</span>
          )}
        </small>
      </div>
    </div>
  );
};

export default NoteCard;