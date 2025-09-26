# MERN Notes App

A simple notes application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- ✅ Add new notes with title and content
- ✅ View all notes in a responsive grid layout
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Responsive design for mobile and desktop
- ✅ Real-time updates
- ✅ Modern, clean UI

## Project Structure

```
notes-app/
├── backend/              # Node.js/Express API server
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   ├── .env             # Environment variables
│   └── package.json     # Backend dependencies
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   ├── App.js       # Main App component
│   │   └── App.css      # Styles
│   └── package.json     # Frontend dependencies
└── README.md
```

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd notes-app
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5000
```

**Note:** If you're using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

### 4. Set up the Frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Start the Frontend

In a new terminal window:

```bash
cd frontend
npm start
```

The React app will start on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Usage

1. **Adding Notes**: Use the form at the top to add new notes with a title and content
2. **Viewing Notes**: All notes are displayed in a responsive grid below the form
3. **Editing Notes**: Click the edit button (✏️) on any note to modify it
4. **Deleting Notes**: Click the delete button (🗑️) and confirm to remove a note

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - Frontend library
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern features
- **HTML5** - Semantic markup

## Development Scripts

### Backend
- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with nodemon for development

### Frontend
- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - For MongoDB Atlas, verify your connection string and network access

2. **CORS Issues**
   - The backend is configured to allow requests from all origins
   - If issues persist, check that the frontend is making requests to the correct backend URL

3. **Port Conflicts**
   - Backend runs on port 5000, frontend on port 3000
   - Change ports in .env (backend) or package.json (frontend) if needed

4. **Module Not Found Errors**
   - Run `npm install` in both backend and frontend directories
   - Delete `node_modules` and `package-lock.json`, then reinstall if problems persist

## Future Enhancements

- 🔄 Search and filter functionality
- 🏷️ Tags and categories for notes
- 👤 User authentication and authorization
- 📱 Mobile app version
- 🌙 Dark mode theme
- 📤 Export notes to different formats
- 🔄 Real-time collaboration

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

**Happy Note-Taking! 📝**