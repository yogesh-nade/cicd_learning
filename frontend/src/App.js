import React, { useState, useEffect } from 'react';
import './App.css';
import { notesAPI } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);
      await notesAPI.createNote({ title, content });
      setTitle('');
      setContent('');
      fetchNotes(); // Refresh notes
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.deleteNote(id);
      fetchNotes(); // Refresh notes
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Notes App - FIXED WORKFLOW v3.0</h1>
        <p>Testing automatic frontend deployment to Netlify!</p>
        <p style={{color: 'green'}}>⚡ Workflow fixed - no tests required!</p>
      </header>

      <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Add Note Form */}
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>✏️ Add New Note</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <textarea
                placeholder="Note content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {loading ? '⏳ Adding...' : '➕ Add Note'}
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div>
          <h2>📋 Your Notes ({notes.length})</h2>
          {loading && <p>⏳ Loading...</p>}
          {notes.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '18px' }}>
              No notes yet. Add your first note above! 👆
            </p>
          )}
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {notes.map((note) => (
              <div key={note._id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{note.title}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.5' }}>{note.content}</p>
                    <small style={{ color: '#999' }}>
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <button
                    onClick={() => deleteNote(note._id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <p>🚀 Deployed automatically via GitHub Actions</p>
          <p>Backend: Render.com | Frontend: Netlify | CI/CD: GitHub Actions</p>
        </footer>
      </main>
    </div>
  );
}

export default App;