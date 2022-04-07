import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from "./Pages/DashboardPage";
import ComicHomePage from "./Pages/ComicHomePage";
import StoryHomePage from "./Pages/StoryHomePage";
import ComicDetailPage from "./Pages/ComicDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import ComicCommunityPage from "./Pages/ComicCommunityPage";
import StoryCommunityPage from "./Pages/StoryCommunityPage";
import StoryDetailPage from "./Pages/StoryDetailPage";
import ComicPlaylistPage from "./Pages/ComicPlaylistPage";
import StoryPlaylistPage from "./Pages/StoryPlaylistPage";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/dashboard" element={<DashboardPage/>}/>
        <Route exact path="/comic/home" element={<ComicHomePage/>}/>
        <Route exact path="/story/home" element={<StoryHomePage/>}/>
        <Route exact path="/comic/detail" element={<ComicDetailPage/>}/>
        <Route exact path="/story/detail" element={<StoryDetailPage/>}/>
        <Route exact path="/comic/community" element={<ComicCommunityPage/>}/>
        <Route exact path="/comic/playlist" element={<ComicPlaylistPage/>}/>
        <Route exact path="/story/community" element={<StoryCommunityPage/>}/>
        <Route exact path="/story/playlist" element={<StoryPlaylistPage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        <Route path="*" element={<LandingPage/>}/>
        {/* <Route path="/register/" exact component={RegisterScreen} />
        <Route path="/login/" exact component={SignInSide} /> */}

      </Routes>
  </Router>
  );
}

export default App;
