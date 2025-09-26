import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the entire services/api module
jest.mock('./services/api', () => ({
  notesAPI: {
    getAllNotes: jest.fn().mockResolvedValue({ data: [] }),
    createNote: jest.fn(),
    updateNote: jest.fn(),
    deleteNote: jest.fn(),
    getNoteById: jest.fn(),
  },
}));

test('renders notes app header', async () => {
  render(<App />);
  
  await waitFor(() => {
    const headerElement = screen.getByText(/My Notes App/i);
    expect(headerElement).toBeInTheDocument();
  });
});

test('renders add new note section', async () => {
  render(<App />);
  
  await waitFor(() => {
    const addNoteText = screen.getByText(/Add New Note/i);
    expect(addNoteText).toBeInTheDocument();
  });
});

test('renders your notes section', async () => {
  render(<App />);
  
  await waitFor(() => {
    const notesSection = screen.getByText(/Your Notes/i);
    expect(notesSection).toBeInTheDocument();
  });
});
