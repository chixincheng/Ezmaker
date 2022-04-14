import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import { useNavigate, useLocation } from "react-router-dom";
import HisPlaylist from "../Components/HisPlaylist";

const HisStoryPlaylistPage = (props)=>{
    const navigate = useNavigate();
    const location = useLocation();

    var names = location.pathname.split("/");
    return(
        <Fragment>
            <Header></Header>
            <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
            <div >
              <div onClick={()=>{ navigate(`/story/user/${names[names.length-1]}`); }} style={{ display: "flex", cursor:"pointer", width: "100px",
                  height: "100px",
                  backgroundImage: `url(${icon})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"}}
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
        <HisPlaylist></HisPlaylist>
      
        
        
      </div>
        </Fragment>
    );
};
export default HisStoryPlaylistPage;