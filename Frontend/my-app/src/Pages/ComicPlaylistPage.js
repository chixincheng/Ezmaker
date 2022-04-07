import { Fragment } from "react";
import Playlist from "../Components/Playlist";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyComic from "../Components/MyComic";
import MyFavoriteComic from "../Components/MyFavoriteComic";
import { useNavigate } from "react-router-dom";
import AvailableComic from "../Components/AvailableComic";
import images from "../Images";

const ComicPlaylistPage = ()=>{

    return(
        <Fragment>
            <Header></Header>
            <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
        
        <Playlist></Playlist>
        <AvailableComic></AvailableComic>
        <div style={{display:"flex", justifyContent:"center"}}>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={()=>{alert(123);}} src={images.addComic}></img>
        </div>
        
      </div>
        </Fragment>
    );
};
export default ComicPlaylistPage;