import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeet from "./pages/videoMeet.jsx";
import HomeComponent from "./pages/home.jsx";
import History from "./pages/history.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/history" element={<History />} />
            <Route path="/:url" element={<VideoMeet />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
