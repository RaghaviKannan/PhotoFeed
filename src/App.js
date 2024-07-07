import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoFeed from "./Components/Photofeed";
import ProfileSection from "./Components/ProfileSection";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PhotoFeed />} />
          <Route path="/user/:userId" element={<ProfileSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
