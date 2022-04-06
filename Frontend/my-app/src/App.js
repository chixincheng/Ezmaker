import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from "./Pages/DashboardPage";
import ComicHomePage from "./Pages/ComicHomePage";
import StoryHomePage from "./Pages/StoryHomePage";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/dashboard" element={<DashboardPage/>}/>
        <Route exact path="/dashboard/comic/home" element={<ComicHomePage/>}/>
        <Route exact path="/dashboard/story/home" element={<StoryHomePage/>}/>
        <Route path="*" element={<LandingPage/>}/>
        {/* <Route path="/register/" exact component={RegisterScreen} />
        <Route path="/login/" exact component={SignInSide} /> */}
      </Routes>
    
  </Router>
  );
}

export default App;
