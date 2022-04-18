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
import Pagination from '@mui/material/Pagination';
import images from "../Images";
import { Tldraw, TldrawApp, useFileSystem, TDDocument } from "@tldraw/tldraw";
import { TDExport, TDExportTypes } from '@tldraw/tldraw'
import { useEffect } from "react";
import api from "../api";
import AuthContext from "../auth";
import { useContext } from "react";
import { saveAs } from 'file-saver';

const ComicEditingPage = () => {
  const ctx = useContext(AuthContext);
  const rTLDrawApp =   new TldrawApp() ;
  const fileSystemEvents = useFileSystem()
  
  
  const id = "tldraw-example"; // [1]
  
  const handleExport = async (info) => {
    
    if (info.serialized) {
     
      const link = document.createElement('a')
      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(info.serialized)
      link.download = info.name + '.' + info.type
      link.click()

      return
    }

    const response = await fetch('https://www.tldraw.com/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    })
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = info.name + '.' + info.type
    link.click()
  };
  
  const handleMount = (app) => {
    
    rTLDrawApp.current = app; // [2]
    
  };

  
  const save = (event)=>{
   
    event.preventDefault();
    
    const app = rTLDrawApp.current;
    console.log(app.document);
    
    var temp = {};
    temp["document"] = app.document;
    var jsonObject = JSON.stringify(temp);
    const formData = new FormData();
    formData.append('tldrFile', new File([ jsonObject ], "demo.tldr", {type: "text/plain;charset=utf-8"}) );
    var payload = {
      authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        comicTitle: "Comic Title Default"
    };
    api.createComic(  formData, payload );
  }
fileSystemEvents.onNewProject = undefined;
fileSystemEvents.onOpenProject = undefined;


  return (
    <Fragment>
      <Header></Header>
      <div
        style={{
          padding: "5rem 3rem 5rem 3rem",
          background: "rgba(250, 241, 194, 1)",
          height: `clac(100vh -  )`,
          display:"flex",
          // justifyContent:"space-between"
        }}
      >
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginRight:"1rem"}}>
        <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Category</b></div>
         <div style={{background:"rgba(209, 247, 255, 1)", padding:"1rem", borderRadius:"1rem", overflow:"scroll"}}>
           <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center"}}> <div >Food</div> </div>
    <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center"}}> <div >Icon</div> </div>
    <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center"}}> <div >Animal</div> </div>
    <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center"}}> <div >Weather</div> </div>
    <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center"}}> <div >Character</div> </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.categoryAdd}></img>
        Create
        </div>
        
      </div>
      <div style={{marginRight:'1rem'}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Icon</b></div>
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
          <img draggable="true" style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.landingPageBackground}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.instagram}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.bebo}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.dribbble}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.pinterest}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.twitter}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.reddit}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.faq}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.coconut}></img>
         </div>
         <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.upload}></img>
        Upload
        </div>
      </div>
     
      <div style={{marginRight:"1rem", width:"100%"}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Comic Creating</b></div>
        
      <div
      style={{
        position: "relative",
        // top: 0,
        // left: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <Tldraw  onExport={handleExport}  {
       
       ...fileSystemEvents
      }  id={id} onMount={handleMount} />
    </div>
       
      </div>
     
      <div>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Button</b></div>
      <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
        <img style={{width:"100px", height:"auto"}} onClick={(event)=>{save(event);}} src={images.save}></img>
        Save
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.publish}></img>
        Publish
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.download}></img>
        Download
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.deleteIcon}></img>
        Delete
        </div>
      </div>
        
      </div>
    </Fragment>
  );
};

export default ComicEditingPage;
