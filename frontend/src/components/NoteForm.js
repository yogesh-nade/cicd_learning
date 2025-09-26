import React, { useState } from 'react';

const NoteForm = ({ onSubmit, initialData = { title: '', content: '' }, isEditing = false }) => {
  const [note, setNote] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim() && note.content.trim()) {
      onSubmit(note);
      if (!isEditing) {
        setNote({ title: '', content: '' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Note title..."
          value={note.title}
          onChange={handleChange}
          className="form-input title-input"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="content"
          placeholder="Write your note here..."
          value={note.content}
          onChange={handleChange}
          className="form-input content-input"
          rows="6"
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        {isEditing ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;