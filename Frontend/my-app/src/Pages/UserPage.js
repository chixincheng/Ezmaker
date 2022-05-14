import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verified.png";
import playlist from "../Images/playlist.png";
import { useNavigate, useLocation } from "react-router-dom";
import HisComic from "../Components/HisComic";
import HisFavoriteComic from "../Components/HisFavoriteComic";
import HisStory from "../Components/HisStory";
import HisFavoriteStory from "../Components/HisFavoriteStory";
import { GlobalStoreContext } from '../store';
import React, { useContext,useState, useEffect } from 'react';
import LoadingPage from "../Pages/LoadingPage"
import api from "../api";
import Chat from "../Components/Chat";
import AuthContext from "../auth";
import classes from "../css/UserPage.module.css"

const UserPage = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const ctx = useContext(GlobalStoreContext);
    const ctx2 = useContext(AuthContext);
    var names = location.pathname.split("/");
    const [currentUser, setCurrentUser] = useState(null);

    
    const getUser = async ()=>{
        const response = await api.getUserById(names.at(-1));
        if( response.status === 200 ){
          setCurrentUser(response.data.user);
        }
       
    };


    useEffect(()=>{
      if( currentUser === null ){
          // for( const user of searchResult   ){
          //     if( user["_id"] === names.at(-1) ){
          //         setCurrentUser(user);
          //     }
          // }
          getUser();
      }
     
    },[ ctx.searchResult ]);


    const handlerContactUser= ()=>{
      Chat( ctx2.auth.user, currentUser ,ctx.chatContainer);
      ctx.showChatFunct();
    }

    if( currentUser === null ){
        return (<LoadingPage></LoadingPage>);
    }

    return(<Fragment>
        <Header></Header>
        <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundImage: `url(${currentUser.profilePicture})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius:"50%"
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <b>{currentUser.userName}</b>
                {currentUser.authentication ?
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
                :
                <div></div>
              }
              </div>
            </div>

            <div className={classes.button} onClick={ handlerContactUser}>
              Contact User
            </div>
                  
            <div onClick={()=>{navigate(`/${names[1]}/playlist/user/${names[names.length-1]}`);}} style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
              {" "}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url(${playlist})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <b>Playlist</b>
            </div>
          </div>
          {location.pathname.includes("comic")?
            <Fragment>
              <HisComic ></HisComic>
              <HisFavoriteComic></HisFavoriteComic>
            </Fragment>
            :
            <Fragment>
              <HisStory ></HisStory>
              <HisFavoriteStory></HisFavoriteStory>
            </Fragment>
          }
        </div>
      </Fragment>);
};

export default UserPage;