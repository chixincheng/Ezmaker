import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyComic from "../Components/MyComic";
import MyFavoriteComic from "../Components/MyFavoriteComic";
import { useNavigate } from "react-router-dom";
import SortButton from "../Components/SortButton";

import AuthContext from "../auth";
import { useContext } from "react";
const ComicHomePage = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      <Header></Header>
      <SortButton></SortButton>
      <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${ctx.auth.user.profilePicture})`,
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
              <b>David Lee</b>
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
          <div onClick={()=>{navigate("/comic/profile");}} style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
            {" "}
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundImage: `url(${editInfo})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <b>Edit Info</b>
          </div>
          <div onClick={()=>{navigate("/comic/playlist");}} style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
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
        <MyComic></MyComic>
        <MyFavoriteComic></MyFavoriteComic>
      </div>
    </Fragment>
  );
};

export default ComicHomePage;
