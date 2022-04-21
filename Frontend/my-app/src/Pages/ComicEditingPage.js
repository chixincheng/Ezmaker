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
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';


const ComicEditingPage = () => {
  const ctx = useContext(AuthContext);
  const rTLDrawApp =   new TldrawApp() ;
  const fileUploaderRef = useRef();
  const fileSystemEvents = useFileSystem();
  const [imgURL, setImgURL] = useState(images.landingPageBackground);
  
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  var names = location.pathname.split("/");
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("Food");
  const [app, setApp] = useState(null);
  const [document, setDocument] = useState(null);
  const [deleteopen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTLDR = async ()=>{
    const getComicResponse = await api.getComic( names.at(-1), {id:ctx.auth.user._id} );
    
    if( getComicResponse.status !== 200 ){
        navigate("/comic/home");
    }


   
    setTitle(getComicResponse.data.comic.comicTitle);

    const response = await fetch( getComicResponse.data.comic.filePath ).then((r)=>{r.text().then((d)=>{ 
      var temp = JSON.parse(d); 
      
      setDocument(temp.document);
      // rTLDrawApp.loadDocument(temp.document);
      // rTLDrawApp.current.loadDocument(temp.document);
      // rTLDrawApp.zoomToFit();
      
      // console.log(rTLDrawApp.shapes);
     
      
      
    })});
  };

  useEffect(()=>{
    if( app !== null && document !== null ){
      app.loadDocument(document);
    }

  },[app, document]);

 

  useEffect(()=>{
    getTLDR();
  },[]);
  
  
  
  
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
    
    setInfo(info);
   
  
    
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
    link.click();
    alert("export success");
    
  };
  
  const handleMount = (app) => {
    console.log(app);
    rTLDrawApp.current = app; 
    setApp(app);
    // console.log(rTLDrawApp.current.document);
    
    
  };

  const deleteComic = async(event)=>{
    event.preventDefault();
    const id = names.at(-1);
    const response = await api.deleteComic(id);
    if(response.status !== 200){
      alert("delete failed");
    }
    else{
      navigate("/comic/home")
    }
  }
  
  const publishComic = async(event)=>{
    setLoading(true);
    event.preventDefault();
   
    var response = await api.getComic(names.at(-1), {id:ctx.auth.user._id} );
    if(response.status === 200){
      const comic = response.data.comic;
      const payload = {
        authorID: ctx.auth.user._id,
        authorName: ctx.auth.user.userName,
        comicTitle: comic.comicTitle,
        comments: [],
        dislikedUser: [],
        likedUser: [],
        publishedTime: new Date(),
        viewNumber: 0,
        filePath: comic.filePath,
        coverPage: comic.coverPage
      }

      response = await api.createPublishedComic(payload);
      if(response.status !== 201){
        alert("published failed");
      }
    }
    

    setLoading(false);
  }

  const save = async (event, app1)=>{
    setLoading(true);
    event.preventDefault();
    // console.log(rTLDrawApp.current);
    // console.log(rTLDrawApp.shapes);
    console.log(app1.shapes);
    
    const exportInfo  = {
      currentPageId: app1.currentPageId,
      name: app1.page.name ?? 'export',
      shapes: app1.shapes ,
      assets: app1.document.assets,
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
    
    
    // const app = rTLDrawApp.current;
    var temp = {};
    temp["document"] = app1.document;
    var jsonObject = JSON.stringify(temp);
    formData = new FormData();
    formData.append('tldrFile', new File([ jsonObject ], "demo.tldr", {type: "text/plain;charset=utf-8"})  );
    
     payload = {
      authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        comicTitle: title,
        id: names.at(-1)
    };

    const response2 = await api.editComic(  formData, payload );
    setLoading(false);
    if ( response2.status === 200 ){
        alert("Save successed");
    }
    else{
        alert( response2.data.message );
    }

  }
fileSystemEvents.onNewProject = undefined;
fileSystemEvents.onOpenProject = undefined;

function deletePopUp(event){
  event.stopPropagation();
  setDeleteOpen(true);
}

function handleDeleteClose (event){
  event.stopPropagation();
  setDeleteOpen(false);
};

  const handleTitleUpdate = (event)=>{
    setTitle(event.target.value);
  }

  const setCategoryFood = () =>{
    console.log("111111");
    setCategory("food");
  }

  const setCategoryIcon = () =>{
    setCategory("icon");
  }

  const setCategoryAnimal = () =>{
    setCategory("animal");
  }

  const setCategoryWeather = () =>{
    setCategory("weather");
  }

  const setCategoryCharacter = () =>{
    setCategory("character");
  }
  
  
  const switchIcon = (param) => {
    switch(param){
      case 'food':
        return(
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.upload}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.pinterest}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.twitter}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
      case 'icon':
        return(
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.upload}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
      case 'animal':
        return(
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.upload}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
      case 'weather':
        return (
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.upload}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.twitter}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.twitter}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.twitter}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
      case 'character':
        return(
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.upload}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
      default:
        return(
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "center", background:"rgba(211, 203, 159, 1)", borderRadius:"1rem", padding:'1rem' }}>
            <img draggable="true" style={{width:"100px", height:"auto"}} src={imgURL}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.instagram}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.bebo}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.dribbble}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.pinterest}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.twitter}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.reddit}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.faq}></img>
            <img style={{width:"100px", height:"auto", cursor: "pointer"}} src={images.coconut}></img>
          </div>
        );
    }
  }

  
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
          display:"flex",
          // justifyContent:"space-between"
        }}
      >
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginRight:"1rem"}}>
        <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Category</b></div>
         <div style={{background:"rgba(209, 247, 255, 1)", padding:"1rem", borderRadius:"1rem", overflow:"scroll"}}>
            <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center", cursor: "pointer"}} onClick={()=>{setCategoryFood()}}> <div >Food</div> </div>
              <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center", cursor: "pointer"}} onClick={setCategoryIcon}> <div >Icon</div> </div>
              <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center", cursor: "pointer"}} onClick={setCategoryAnimal}> <div >Animal</div> </div>
              <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center", cursor: "pointer"}} onClick={setCategoryWeather}> <div >Weather</div> </div>
              <div style={{marginBottom:"1rem",width:"100px", height:"50px",backgroundImage:`url(${images.categoryTitle})`, backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', display:"flex", justifyContent:"center", alignItems:"center", cursor: "pointer"}} onClick={setCategoryCharacter}> <div >Character</div> </div>
        </div>
      </div>
      <div style={{marginRight:'1rem'}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Icon</b></div>
          {switchIcon(category)}
      </div>
     
      <div style={{marginRight:"1rem", width:"100%"}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}>
        <TextField 
          value = {title}
          onChange ={(event)=>{handleTitleUpdate(event);}}
          >
        </TextField>
      </div>
        
      <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      
    >
      <Tldraw   onPersist={(app)=>{ console.log(app.pageState.camera); }}  onExport={handleExport}  {...fileSystemEvents}     onMount={handleMount} />
    </div>
       
      </div>
      
        <div>
          <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Button</b></div>
          <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
            <img style={{width:"100px", height:"auto"}} onClick={(event)=>{save(event,app);}} src={images.save}></img>
            Save
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
            <img style={{width:"100px", height:"auto"}} onClick={(event)=>{publishComic(event);}} src={images.publish}></img>
            Publish
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
            <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.download}></img>
            Download
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
            <img style={{width:"100px", height:"auto"}} onClick={deletePopUp} src={images.deleteIcon}></img>
            Delete
            </div>
        </div>
      </div>
      {/* <div>
        <label for="img">Select icon image: </label>
        <input type="file" id="img" name="img"  ref={fileUploaderRef} accept="image/*"/>
        <input onClick={fileUploadOnClick} type="submit"/>
      </div> */}
      <Dialog
            id = "delete-modal"
            maxWidth='sm'
            open= {deleteopen}
            onClose={(event)=>{handleDeleteClose(event);}}
            >
            <DialogTitle>
               Delete the {title} ?
               <DialogActions>
                    <Button onClick={(event)=>{deleteComic(event);}}>Confirm</Button>
                    <Button onClick={(event)=>{handleDeleteClose(event);}}>Cancel</Button>
                </DialogActions>
            </DialogTitle>
        </Dialog>
    </Fragment>
  );
};

export default ComicEditingPage;
