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

const ComicEditingPage = () => {
  return (
    <Fragment>
      <Header></Header>
      <div
        style={{
          padding: "5rem 3rem 5rem 3rem",
          background: "rgba(250, 241, 194, 1)",
          height: `clac(100vh -  )`,
          display:"flex",
          justifyContent:"space-between"
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
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.facebook}></img>
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
      <div style={{marginRight:"1rem"}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Tool</b></div>
        <div style={{display:"flex", flexDirection:"column"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.pen}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.eraser}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.colorFill}></img>
          <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.textOrTextSize}></img>
        </div>
      </div>
      <div style={{marginRight:"1rem"}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Comic Creating</b></div>
        
        <div style={{height:"500px", width:"400px", background : "white"}}></div>
        <div style={{display:"flex",justifyContent:"center", marginTop:"1rem"}}><Pagination count={10} color="primary" /></div>
      </div>
      <div style={{marginRight:"1rem", display:"flex", flexDirection:"column"}}>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Page</b></div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"5rem 0 5rem 0"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.addPage}></img>
        Add Page
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.removePage}></img>
        Remove Page
        </div>
      </div>
      <div>
      <div style={{textAlign:'center', marginBottom:"1rem", fontSize:"2em"}}><b>Button</b></div>
      <div style={{display:"flex", flexDirection:"column", alignItems:'center' , cursor:"pointer", margin:"1rem"}}>
        <img style={{width:"100px", height:"auto"}} onClick={()=>{alert("/comic/editing");}} src={images.save}></img>
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
