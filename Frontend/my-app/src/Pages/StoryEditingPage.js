import { Fragment, useState, useContext, useEffect, useRef} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Playlist from "../Components/Playlist";
import Header from "../Components/Header";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyStory from "../Components/MyStory";
import MyFavoriteStory from "../Components/MyFavoriteStory";
import AvailableComic from "../Components/AvailableComic";
// import AuthContext from "../auth";
import api from "../api";
import images from "../Images";
import { TextField } from "@mui/material";

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const StoryEditingPage = () => {

  // const ctx = useContext(AuthContext);

  // const [title,setTitle] = useState("");
  const titleRef = useRef()

  const [content, setContent] = useState("")
  // const content = useRef("")

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const storyID = location.pathname.split("/").at(-1);
  
  const navigate = useNavigate(); 

  // quill object
  const { quill, quillRef } = useQuill();

  // const theme = 'snow';
  // const modules = {
  //   toolbar:  [
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ align: [] }],
  
  //     [{ list: 'ordered'}, { list: 'bullet' }],
  //     [{ indent: '-1'}, { indent: '+1' }],
  
  //     [{ size: ['small', false, 'large', 'huge'] }],
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ['link', 'image', 'video'],
  //     [{ color: [] }, { background: [] }],
  
  //     ['clean'],
  //   ],
  // };
  // const formats = [
  //   'bold', 'italic', 'underline', 'strike',
  //   'align', 'list', 'indent',
  //   'size', 'header',
  //   'link', 'image', 'video',
  //   'color', 'background',
  //   'clean',
  // ];
  // const placeholder = 'Compose an epic...';
  // const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });
  

  const save = async (event)=>{
    setLoading(true);
    event.preventDefault();
    const payload = {
      // publishID: null,
      id: storyID,
      storyTitle: titleRef.current.value,
      content: quill.getContents()
    }
    const editStoryResponse = await api.editStory( payload );
    setLoading(false);

    if ( editStoryResponse.status === 200 ){
        alert("Save successed");
    }
    else{
        alert( editStoryResponse.data.message );
    }
  }
  // {id:ctx.auth.user._id}
  const getQuill = async () => {
    const getStoryResponse = await api.getStory( storyID );
    if( getStoryResponse.status !== 200 ){
      navigate("/story/home");
    }

    if (getStoryResponse.data.story.content) {
    // if (getStoryResponse.data.story.content && content !== getStoryResponse.data.story.content) {
      setContent(getStoryResponse.data.story.content)
    }
    
    titleRef.current.value = getStoryResponse.data.story.storyTitle
    var delta = JSON.parse(content)['ops']
    quill.setContents(delta)
    
  }

  useEffect(()=>{
    getQuill();
  });

  // useEffect(()=>{
  //   // alert("before quill\n" + content.current)
    
  //   // alert("after quill\n" + content.current)
  // }, []);






  



  return (
    <Fragment>
      {loading ? 
      <Fragment>
        <div style={{opacity:"0.5",position:"fixed", zIndex:"50" ,width:"100vw", height:"100vh", background:"#F0F0F0"}}></div>
        <div style={{ position:"fixed",zIndex:"100"  ,width:"100vw", height:"100vh", backgroundImage:`url(${images.loading})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain',backgroundPosition: 'center' }} > 
        
        </div>
         </Fragment>
     
      :
      <Fragment/>
      }
      <Header></Header>
      <div
        style={{
          padding: "5rem 3rem 5rem 3rem",
          background: "rgba(250, 241, 194, 1)",
          height: `clac(100vh -  )`,
        }}
      >
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
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
        </div> */}

      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}>
        <TextField 
          label="Story Title"
          inputRef = {titleRef}
          type="text"
          value = {"Story Title Default"}
          // ref = {titleRef}
          // onChange ={(event)=>{handleTitleUpdate(event);}}
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

                quill.setContents({ "ops": [ { "insert": "hihihihi\n" } ] })
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
              onClick={(event)=>{
                save(event);
                // var contents = quill.getContents()
                // var string = JSON.stringify(contents, null, 2);
                // var newWindow = window.open();
                // newWindow.document.write(string);
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
