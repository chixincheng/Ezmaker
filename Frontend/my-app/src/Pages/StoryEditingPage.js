import { Fragment, useState, useContext, useEffect, useRef} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import AuthContext from "../auth";
import api from "../api";
import images from "../Images";
import { TextField } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const StoryEditingPage = () => {

  const ctx = useContext(AuthContext);
  const [title,setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const storyID = location.pathname.split("/").at(-1);
  const [publishID, setPublishID] = useState(null);
  const [deleteopen, setDeleteOpen] = useState(false);
  const coverPageImgRef = useRef();
  const navigate = useNavigate(); 

  // quill object
  const { quill, quillRef } = useQuill();

  const handleTitleUpdate = (event)=>{
    setTitle(event.target.value);
  }

  const uploadCoverPage = async(event)=>{
    const formData = new FormData();
    formData.append('imgFile', coverPageImgRef.current.files[0] );
    var payload = {
      id: storyID,
    };
    const response = await api.editStoryCoverPage(formData, payload );
    if ( response.status===200 ){
        alert("Successfully updated Story cover page picture.");
    }
    else{
        alert("Failed to update Story cover page picture.");
    }
  }
  
  const save = async (event)=>{
    setLoading(true);
    event.preventDefault();

    // create quill file in .json format to be stored in Cloudinary
    let jsonObject = JSON.stringify(quill.getContents())
    let formData = new FormData();
    formData.append('quillFile', new File([ jsonObject ], "demo.json", {type: "text/plain;charset=utf-8"})  );

    // update story metadata in the database
    var payload = {
      publishID: publishID,
      id: storyID,
      storyTitle: title,
      authorID: ctx.auth.user._id,
    }
    const editStoryResponse = await api.editStory( formData, payload);
    setLoading(false);

    if ( editStoryResponse.status === 200 ){
        alert("Save successed");
    }
    else{
        alert( editStoryResponse.data.message );
    }
  }

  const publishStory = async(event)=>{
    setLoading(true);
    event.preventDefault();
   
    var response = await api.getStory(storyID, {id:ctx.auth.user._id} );
    if(response.status === 200){
      const story = response.data.story;
      var payload = {
        authorID: ctx.auth.user._id,
        authorName: ctx.auth.user.userName,
        storyTitle: story.storyTitle,
        comments: [],
        dislikedUser: [],
        likedUser: [],
        publishedTime: new Date(),
        coverPage: story.coverPage,
        viewNumber: 0,
        filePath: story.filePath
      }

      response = await api.createPublishedStory(payload);
      if(response.status !== 201){
        alert("published failed");
      }
      else{
        setPublishID(response.data.publishedStory._id);
        payload = {
          publishID: response.data.publishedStory._id,
          authorID: ctx.auth.user._id,
          id: storyID,
          storyTitle: title
        }
        response = await api.editStory(null,payload);
      }
    }
    
    setLoading(false);
  }


  const unpublishStory = async(event)=>{
    setLoading(true);
    event.preventDefault();

    var response = await api.getStory(storyID, {id:ctx.auth.user._id} );
    if(response.status === 200){
      const story = response.data.story;
      response = await api.deletePublishedStory(story.publishID);
      if(response.status !== 200){
        alert("delete failed");
      }
      else{
        const payload = {
          publishID: null,
          id: storyID,
          storyTitle: title,
          authorID: ctx.auth.user._id
        }
        response = await api.editStory(null,payload);
        setPublishID(null);
      }
    }
  
    setLoading(false);
  }

  function deletePopUp(event){
    event.stopPropagation();
    setDeleteOpen(true);
  };

  function handleDeleteClose (event){
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const deleteStory = async(event)=>{
    event.preventDefault();
    const response = await api.deleteStory(storyID);
    if(response.status !== 200){
      alert("delete failed");
    }
    else{
      navigate("/story/home")
    }
  }


  const getQuill = async () => {
    var getStoryResponse = await api.getStory( storyID, {id:ctx.auth.user._id});
    if( getStoryResponse.status !== 200 ){
      navigate("/story/home");
    }

    setTitle(getStoryResponse.data.story.storyTitle)
    setPublishID(getStoryResponse.data.story.publishID);

    const response = await fetch( getStoryResponse.data.story.filePath ).then((r)=>{r.text().then((data)=>{
      var delta = JSON.parse(data)['ops']
      quill.setContents(delta)
    })});
    
  }

  useEffect(()=>{
    if (quill !== undefined) {
      getQuill();
    }
    
  }, [quill]);


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

        <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}>
          <TextField 
            label="Story Title"
            value = {title}
            type="text"
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
          <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
            <img type="file" name="img"  ref={coverPageImgRef} accept="image/*"
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
               
                position: "relative",
                display: "flex",
              }}
              onClick={(event)=>{uploadCoverPage(event);}}
              src={images.upload}
            ></img>
            <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
              <p>Upload Cover Page</p>
              <input style={{width:"70%"}}type="file" name="img" ref={coverPageImgRef} accept="image/*"/>
            </div>
            
          </div>
          
          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
               
              }}
              onClick={(event)=>{save(event);}}
              src={images.save}
            ></img>
            <p>Save</p>
          </div>

          {publishID?
            <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
              <img
                style={{
                  width: "100px",
                  height: "auto",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  unpublishStory(event);
                }}
                src={images.publish}
              ></img>
              <p>Unpublish</p>
            </div>
            :
            <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
              <img
                style={{
                  width: "100px",
                  height: "auto",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  publishStory(event);
                }}
                src={images.publish}
              ></img>
              <p>Publish</p>
            </div>
          }


          <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
            <img
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
              }}
              onClick={deletePopUp}
              src={images.deleteIcon}
            ></img>
            <p>Delete</p>
          </div>
        </div>
      </div>
      <Dialog
        id = "delete-modal"
        maxWidth='sm'
        open= {deleteopen}
        onClose={(event)=>{handleDeleteClose(event);}}
        >
        <DialogTitle>
          Delete the {title} ?
          <DialogActions>
              <Button onClick={(event)=>{deleteStory(event);}}>Confirm</Button>
              <Button onClick={(event)=>{handleDeleteClose(event);}}>Cancel</Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </Fragment>
  );
};

export default StoryEditingPage;
