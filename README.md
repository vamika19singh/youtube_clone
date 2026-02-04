# Youtube Clone - MERN Stack
A full-stack YouTube Clone application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This project implements core YouTube functionalities including authentication, video browsing, playback, likes, comments, and channels.

---

## Features

### Authentication
- User registration with username, email, and password
- User login using JWT authentication
- Protected routes for authenticated users
- Logout functionality

### Video Features
- Display list of recommended videos
- Watch video on a dedicated video player page
- View count tracking
- Like and dislike functionality
- Comment system (add and view comments)

### Channel
- User channel page
- View videos uploaded by a specific user

###  Navigation
- Navbar with search functionality
- Sidebar similar to YouTube layout
- User avatar displayed after login

---

##  Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)

---

## Project Structure

```text
youtube-clone-mern/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md


## Github Repository

https://github.com/vamika19singh/youtube_clone