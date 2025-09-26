import axios from 'axios';


// Backend API URL - uses environment variable or fallback to production
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://notes-app-backend-yogeshnade.onrender.com/api';
// const API_BASE_URL = 'http://localhost:5000/api';   // For local development
console.log('🔗 Frontend connecting to backend:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesAPI = {
  // Get all notes
  getAllNotes: () => api.get('/notes'),

  getDevelopersInfo: () => api.get('/notes/developer'),
  
  // Get a single note by ID
  getNoteById: (id) => api.get(`/notes/${id}`),
  
  // Create a new note
  createNote: (note) => api.post('/notes', note),
  
  // Update a note
  updateNote: (id, note) => api.put(`/notes/${id}`, note),
  
  // Delete a note
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;