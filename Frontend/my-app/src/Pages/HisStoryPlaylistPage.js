import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import { useNavigate, useLocation } from "react-router-dom";
import HisPlaylist from "../Components/HisPlaylist";
import { GlobalStoreContext } from '../store';
import React, { useContext,useState, useEffect } from 'react';
import LoadingPage from "../Pages/LoadingPage"

const HisStoryPlaylistPage = (props)=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { store,searchResult } = useContext(GlobalStoreContext);
  var names = location.pathname.split("/");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    if( searchResult.length <1 ){
       store.setSearchKey(names.at(-1));
    }
    else if( currentUser === null ){
        for( const user of searchResult   ){
            if( user["userName"] === names.at(-1) ){
                setCurrentUser(user);
            }
        }
    }
   
  },[ searchResult ]);



  if( currentUser === null ){
      return (<LoadingPage></LoadingPage>);
  }
    return(
        <Fragment>
            <Header></Header>
            <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
              <div onClick={()=>{ navigate(`/story/user/${names[names.length-1]}`); }} style={{ display: "flex", cursor:"pointer", width: "100px",
                  height: "100px",
                  backgroundImage: `url(${currentUser.profilePicture})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius:"50%",
                  backgroundRepeat: "no-repeat"}}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems:"center"
                }}
              >
                <b>{names[names.length-1]}</b>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: `url(${verify})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
        <HisPlaylist></HisPlaylist>
      
        
        
      </div>
        </Fragment>
    );
};
export default HisStoryPlaylistPage;