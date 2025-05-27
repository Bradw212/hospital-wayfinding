import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";

// Example placeholder Home component
function Home() {
  return (
    <div>
      <h2>Welcome to Hospital Wayfinding Admin</h2>
      <p>Use the navigation to manage locations.</p>
    </div>
  );
}

// Example placeholder NotFound component
function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Simple navigation bar */}
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/locations">Locations</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;