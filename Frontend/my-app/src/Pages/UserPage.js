import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import playlist from "../Images/playlist.png";
import { useNavigate, useLocation } from "react-router-dom";
import HisComic from "../Components/HisComic";
import HisFavoriteComic from "../Components/HisFavoriteComic";
import HisStory from "../Components/HisStory";
import HisFavoriteStory from "../Components/HisFavoriteStory";


const UserPage = ()=>{
    const navigate = useNavigate();
    const location = useLocation();

    var names = location.pathname.split("/");

    return(<Fragment>
        <Header></Header>
        <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundImage: `url(${icon})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
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