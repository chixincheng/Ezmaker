import logo from "./logo.svg";
import "./App.css";
import { React } from 'react'
import LandingPage from "./Pages/LandingPage";
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
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
import StoryEditingPage from "./Pages/StoryEditingPage";
import ComicEditingPage from "./Pages/ComicEditingPage";
import SignInSide from "./Components/SignInSide";
import RegisterScreen from "./Components/RegisterScreen";
import LoadingPage from "./Pages/LoadingPage";
import { useContext } from "react";
import AuthContext from "./auth";
import { Fragment } from "react";

function App() {
  const ctx = useContext(AuthContext);
  if( ctx.isLoading ){
    return(<LoadingPage/>);
  }

  return (
    <Fragment>
        <GlobalStoreContextProvider>
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
            <Route exact path="/story/editing" element={<StoryEditingPage/>}/>
            <Route exact path="/comic/editing" element={<ComicEditingPage/>}/>

            <Route exact path="/comic/profile" element={<ProfilePage/>}/>
            <Route exact path="/story/profile" element={<ProfilePage/>}/>
            <Route path="*" element={<LandingPage/>}/>
            <Route exact path="/register" element={<RegisterScreen/>} />
            <Route exact path="/login" element={<SignInSide/>} />

          </Routes>
        </GlobalStoreContextProvider>
        </Fragment>
  );
}

export default App;
