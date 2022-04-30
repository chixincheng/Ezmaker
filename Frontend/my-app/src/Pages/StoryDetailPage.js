import Header from "../Components/Header";
import addFav from "../Images/addFav.png";
import removeFav from "../Images/removeFav.png";
import download from "../Images/download.png";
import Pagination from '@mui/material/Pagination';
import rightimage from "../Images/comicsDetailSample.png";
import leftimage from "../Images/comicsDetailSample2.png";
import commentSend from "../Images/commentSend.png";
import List from '@mui/material/List';
import likeIcon from "../Images/like.png";
import dislikelikeIcon from "../Images/unlike.png";

import { Fragment, useState, useContext, useEffect, useRef} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Playlist from "../Components/Playlist";
import icon from "../Images/icon.png";
import verify from "../Images/verify.png";
import editInfo from "../Images/editInfo.png";
import playlist from "../Images/playlist.png";
import MyStory from "../Components/MyStory";
import MyFavoriteStory from "../Components/MyFavoriteStory";
import AvailableComic from "../Components/AvailableComic";
import AuthContext from "../auth";
import api from "../api";
import images from "../Images";
import { TextField } from "@mui/material";

import { useQuill } from 'react-quilljs';


var addFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(80vw - 40px)', backgroundImage: `url(${addFav})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };
var removeFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(85vw - 30px)', backgroundImage: `url(${removeFav})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var downloadButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(90vw - 20px)', backgroundImage: `url(${download})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var textStyle = {
    fontFamily: 'Love Ya Like A Sister',
    fontSize: 36
};

var likeButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(10vw - 100px)', backgroundImage: `url(${likeIcon})`,
    backgroundPosition: 'left',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };
var dislikeButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(15vw - 70px)', backgroundImage: `url(${dislikelikeIcon})`,
   backgroundPosition: 'left',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var commentTitle = {
    fontFamily: 'Ribeye Marrow',
    fontSize: 36
};
var commendSentStyle = {height:"50px", width:"80px", position:"absolute" , bottom:"-60px", right:"15px",  backgroundImage: `url(${commentSend})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
const addFavorite = ()=>{
    ;
};
const removeFavorite = ()=>{
    ;
};
const downloadStory = () => {
    ;
}
const addComment = () => {
    ;
}
const like = () => {
    ;
}

const dislike = () => {
    ;
}

var commentArr = [[],[],[]];
commentArr[0].push("Gank Owen", "Wow I like it")
commentArr[1].push("Jamie Li", "Wow I like it")
commentArr[2].push("Sheng", "Wow I like it")

var commentAuthorNameStyle = {
    fontSize: 16,
    marginLeft: "5px",
    height: "50px",
    width: "100px",
    justifyContent: "center"
};
var commentStyle = {
    fontSize: 16,
    height: "50px",
    width: "800px",
    background: "rgba(250, 241, 194, 1)",
    marginLeft: "40px"
};
let commentList = <List>
    {
        commentArr.map((text,index)=>(
            <div style={{display: "flex", paddingBottom: "50px"}}>
                <div style={commentAuthorNameStyle}>
                    <p>{text[0]}:</p>
                </div>
                <div style={commentStyle}>
                    <p style={{paddingLeft: "10px"}}>{text[1]}</p>
                </div>
            </div>
        ))
    }
</List>;

const StoryDetailPage = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const location = useLocation();
    var storyID = location.pathname.split("/").at(-1);

    const { quill, quillRef } = useQuill({theme: 'bubble'});
    

    const getQuill = async () => {
        var getStoryResponse = await api.getPublishedStoryByID( storyID);
        if( getStoryResponse.status !== 200 ){
          navigate("/story/home");
        }
    
        setStory(getStoryResponse.data.story);
    
        const response = await fetch( getStoryResponse.data.story.filePath ).then((r)=>{r.text().then((data)=>{
          var delta = JSON.parse(data)['ops']
          quill.setContents(delta)
          
        })});
        
        quill.disable()
    }

    useEffect(()=>{
        if (quill !== undefined) {
            getQuill();
        }
    }, [quill]);


    return(
        <div  style={{background:"rgba(250, 241, 194, 1)", display:"flex", justifyContent: "center", flexDirection: "column"}} >
            <Header></Header>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                <div style={addFavButtonStyle} onClick={addFavorite}></div>
                <div style={removeFavButtonStyle} onClick={removeFavorite}></div>
                <div style={downloadButtonStyle} onClick={downloadStory}></div>
                
                <div style={likeButtonStyle} onClick={like}></div>
                <div style={dislikeButtonStyle} onClick={dislike}></div>
               
                <div style={textStyle}>{story === null ?   "Story Title":story.storyTitle}</div>
                <div style={textStyle}>{story === null ?   "Author Name":story.authorName}</div>
            </div>

            <div style={{display:"flex", justifyContent: "center"}}>
                <div 
                    id="quill"
                    ref={quillRef}
                    style={{ 
                        width: "80%", 
                        height: "700px",
                    }}/>
            </div>


            <div style={{display:"flex",justifyContent:"center", background: "rgba(250, 241, 194, 1)", marginBottom:"1rem"}}><Pagination count={10} color="primary" /></div>
            
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                <div style={commentTitle}>Comment</div>
                <div style={{height:"300px", width:"100%", background : "white", position:"relative"}}><div style={commendSentStyle} onClick={addComment}></div></div>
                
            </div>
            
            <div style={{display: "flex", justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                {commentList}
            </div>
        </div>
    );
};   

export default StoryDetailPage;