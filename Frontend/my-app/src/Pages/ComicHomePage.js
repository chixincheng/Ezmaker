import { Fragment } from "react";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyComic from "../Components/MyComic";

const ComicHomePage = () => {
  return (
    <Fragment>
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
          <div style={{display:"flex", alignItems:"center"}}>
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
          <div style={{display:"flex", alignItems:"center"}}>
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
      </div>
    </Fragment>
  );
};

export default ComicHomePage;
