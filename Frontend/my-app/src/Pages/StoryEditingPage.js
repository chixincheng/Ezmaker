import { Fragment, useState} from "react";
import Playlist from "../Components/Playlist";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyStory from "../Components/MyStory";
import MyFavoriteStory from "../Components/MyFavoriteStory";
import { useNavigate } from "react-router-dom";
import AvailableComic from "../Components/AvailableComic";
import images from "../Images";
import { TextField } from "@mui/material";

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const StoryEditingPage = () => {

  const [title,setTitle] = useState("");
  const handleTitleUpdate = (event)=>{
    setTitle(event.target.value);
  }

  // quill object
  const theme = 'snow';
  const modules = {
    toolbar:  [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
  
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
  
      ['clean'],
    ],
  };
  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'size', 'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ];
  const placeholder = 'Compose an epic...';
  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });


  const save = async (event, app1)=>{

  }

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

        {/* <div 
          style={{ 
            width: "100%", 
            height: "500px",
            // margin: "1rem 0 1rem 0",
            backgroundColor: "white",
          }}>
          <div 
            ref={quillRef} 
            />
        </div> */}

      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}>
        <TextField 
          label="Story Title"
          value = {title}
          onChange ={(event)=>{handleTitleUpdate(event);}}
          >
        </TextField>
      </div>

        <div style={{backgroundColor: "white"}}>
          <div 
            ref={quillRef} 
            style={{ 
              width: "100%", 
              height: "500px",
            }}/>
        </div>
        


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
                alert('123');
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
                // (event)=>{save(event,app);}
                var contents = quill.getContents()['ops']
                var string = JSON.stringify(contents, null, 2);
                var newWindow = window.open();
                newWindow.document.write(string);
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
