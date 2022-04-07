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

const StoryEditingPage = () => {
  return (
    <Fragment>
      <Header></Header>
      <div
        style={{
          padding: "5rem 3rem 5rem 3rem",
          background: "rgba(250, 241, 194, 1)",
          height: `clac(100vh -  )`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.textOrTextSize}
          ></img>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.underline}
          ></img>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.colorChange}
          ></img>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.bold}
          ></img>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.highlighter}
          ></img>
          <img
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick={() => {
              alert(123);
            }}
            src={images.italic}
          ></img>
        </div>
        <div
          style={{
            height: "500px",
            width: "100%",
            background: "white",
            margin: "1rem 0 1rem 0",
          }}
        ></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
               
                position: "relative",
                display: "flex",
              }}
              onClick={() => {
                alert(123);
              }}
              src={images.upload}
            ></img>
            <p>upload</p>
          </div>
          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
               
              }}
              onClick={() => {
                alert(123);
              }}
              src={images.save}
            ></img>
            <p>save</p>
          </div>
          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                
              }}
              onClick={() => {
                alert(123);
              }}
              src={images.publish}
            ></img>
            <p>publish</p>
          </div>
          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
               
              }}
              onClick={() => {
                alert(123);
              }}
              src={images.deleteIcon}
            ></img>
            <p>delete</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StoryEditingPage;
