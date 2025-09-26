import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios to avoid import issues during testing
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

test('renders notes app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/My Notes App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders add new note section', () => {
  render(<App />);
  const addNoteText = screen.getByText(/Add New Note/i);
  expect(addNoteText).toBeInTheDocument();
});
