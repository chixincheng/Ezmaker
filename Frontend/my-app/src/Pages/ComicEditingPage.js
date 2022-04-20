import { Fragment, useState } from "react";
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
import { Tldraw, TldrawApp, useFileSystem, TDDocument,  TDExport } from "@tldraw/tldraw";
import { TDExportTypes } from '@tldraw/tldraw'
import { useEffect } from "react";
import api from "../api";
import AuthContext from "../auth";
import { useContext,useRef } from "react";

import { saveAs } from 'file-saver';
import { Utils } from "@tldraw/core";
import { useLocation } from "react-router-dom";

  

const ComicEditingPage = () => {
  const ctx = useContext(AuthContext);
  const rTLDrawApp =   new TldrawApp() ;
  
  const fileUploaderRef = useRef();
 

   // [1]
  const fileSystemEvents = useFileSystem();
  const [imgURL, setImgURL] = useState(images.landingPageBackground);
  const [read, setRead] = useState(false);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  var names = location.pathname.split("/");
  
  const getTLDR = async ()=>{
    const getComicResponse = await api.getComic( names.at(-1), {id:ctx.auth.user._id} );
    
    if( getComicResponse.status !== 200 ){
        navigate("/comic/home");
    }


    console.log(getComicResponse);


    const response = await fetch( getComicResponse.data.comic.filePath ).then((r)=>{r.text().then((d)=>{ 
      var temp = JSON.parse(d); 
      
     
      rTLDrawApp.current.loadDocument(temp.document);
      rTLDrawApp.current.zoomToFit();
      console.log(rTLDrawApp);
      const shapes = rTLDrawApp.current.shapes;
      for( const shape of shapes ){
        console.log( JSON.stringify(shape.style) );
      }
      
       setRead(true);
    })});
  };

 

  useEffect(()=>{
    getTLDR();
  },[]);
  
  // fileSystemEvents.onNewProject(rTLDrawApp);
  const id = "tldraw-example1"; // [1]
  
  const fileUploadOnClick = async ()=>{
    // const formData = new FormData();
    // formData.append('imgFile', fileUploaderRef.current.files[0] );
    // const response = await api.updateUserById(_id, null , formData );
    // if ( response.status===200 ){
    //     alert("Successfully updated profile picture.");
    //     navigate(0);
    // }
    // else{
    //     alert("Failed to updat profile picture.");
    // }
}

  const handleExport = async (info) => {
    console.log(info);
    setInfo(info);
    console.log(rTLDrawApp.current.getPage(rTLDrawApp.currentPageId));
  
    
    if (info.serialized) {
     
      const link = document.createElement('a');
      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(info.serialized);
      link.download = info.name + '.' + info.type;
      link.click();

      return
    }
   
    const response = await fetch('https://www.tldraw.com/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    setImgURL(blobUrl);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = info.name + '.' + info.type;
    console.log(blob);
    // link.click();
    alert("export success");
    
  };
  
  const handleMount = (app) => {
    
    rTLDrawApp.current = app; // [2]
    
    
  };

  
  const save = async (event)=>{
   
    event.preventDefault();
    
    const exportInfo  = {
      currentPageId: rTLDrawApp.currentPageId,
      name: rTLDrawApp.page.name ?? 'export',
      shapes: rTLDrawApp.current.shapes ,
      assets: rTLDrawApp.document.assets,
      type: "png",
      serialized: undefined,
      size: [3500, 5000],
    }
   
    
   
    
    
    const response1 = await fetch('https://www.tldraw.com/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exportInfo),
    });
    const blob = await response1.blob();
    

    var formData = new FormData();
    formData.append('imgFile', new File([blob], 'image.jpeg', {type: "jpeg"}) );
  var payload = {
    id: names.at(-1),
      
  };
    const updateCoverResponse = await api.editComicCoverPage(formData, payload );
    
    
    const app = rTLDrawApp.current;
    var temp = {};
    temp["document"] = app.document;
    var jsonObject = JSON.stringify(temp);
    formData = new FormData();
    formData.append('tldrFile', new File([ jsonObject ], "demo.tldr", {type: "text/plain;charset=utf-8"})  );
    
     payload = {
      authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        comicTitle: "Comic Title Default",
        id: names.at(-1)
    };

    const response2 = await api.editComic(  formData, payload );
    if ( response2.status === 200 ){
        alert("Save successed");
    }
    else{
        alert( response2.data.message );
    }

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
          <img draggable="true" style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={imgURL}></img>
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
      onClick={(e)=>{ console.log("123");}}
    >
      <Tldraw   showMenu={!read} showMultiplayerMenu={!read} showPages={true} readOnly={ read } onExport={handleExport}  {
       
       ...fileSystemEvents
      }  onClick={()=>{console.log("456");}}   onMount={handleMount} />
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
      <div>
            <label for="img">Select icon image: </label>
            <input type="file" id="img" name="img"  ref={fileUploaderRef} accept="image/*"/>
            <input onClick={fileUploadOnClick} type="submit"/>
      </div>
    </Fragment>
  );
};

export default ComicEditingPage;
