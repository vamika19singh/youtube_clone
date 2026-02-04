import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import VideoPlayer from "./pages/VideoPlayer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Channel from "./pages/Channel";

function App() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                  <Home />
              }
            />

            <Route
              path="/video/:id"
              element={
                <ProtectedRoute>
                  <VideoPlayer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/channel/:id"
              element={
                <ProtectedRoute>
                  <Channel />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
