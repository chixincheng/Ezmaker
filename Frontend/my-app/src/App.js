import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashboardPage from "./Pages/DashboardPage";
import ComicHomePage from "./Pages/ComicHomePage";
import StoryHomePage from "./Pages/StoryHomePage";
import ComicDetailPage from "./Pages/ComicDetailPage";
import ComicCommunityPage from "./Pages/ComicCommunityPage";
import StoryCommunityPage from "./Pages/StoryCommunityPage";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/dashboard" element={<DashboardPage/>}/>
        <Route exact path="/comic/home" element={<ComicHomePage/>}/>
        <Route exact path="/story/home" element={<StoryHomePage/>}/>
        <Route exact path="/comic/detail" element={<ComicDetailPage/>}/>
        <Route exact path="/comic/community" element={<ComicCommunityPage></ComicCommunityPage>}/>
        <Route exact path="/story/community" element={<StoryCommunityPage></StoryCommunityPage>}/>
        
        <Route path="*" element={<LandingPage/>}/>
        {/* <Route path="/register/" exact component={RegisterScreen} />
        <Route path="/login/" exact component={SignInSide} /> */}

      </Routes>
  </Router>
  );
}

export default App;
