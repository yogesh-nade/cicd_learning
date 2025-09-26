import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { notesAPI } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');

  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes(prev => [response.data, ...prev]);
      setError('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note.');
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const response = await notesAPI.updateNote(editingNote._id, noteData);
      setNotes(prev => 
        prev.map(note => 
          note._id === editingNote._id ? response.data : note
        )
      );
      setEditingNote(null);
      setError('');
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(noteId);
        setNotes(prev => prev.filter(note => note._id !== noteId));
        setError('');
      } catch (error) {
        console.error('Error deleting note:', error);
        setError('Failed to delete note.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 My Notes App</h1>
      </header>
      
      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-section">
          {editingNote ? (
            <div>
              <div className="edit-header">
                <h2>Edit Note</h2>
                <button onClick={handleCancelEdit} className="cancel-btn">
                  Cancel
                </button>
              </div>
              <NoteForm
                onSubmit={handleUpdateNote}
                initialData={editingNote}
                isEditing={true}
              />
            </div>
          ) : (
            <div>
              <h2>Add New Note</h2>
              <NoteForm onSubmit={handleAddNote} />
            </div>
          )}
        </div>

        <div className="notes-section">
          <h2>Your Notes ({notes.length})</h2>
          <NotesList
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
