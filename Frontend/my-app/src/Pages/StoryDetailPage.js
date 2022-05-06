import Header from "../Components/Header";
import addFav from "../Images/addFav.png";
import removeFav from "../Images/removeFav.png";
import download from "../Images/download.png";
import Pagination from '@mui/material/Pagination';
import commentSend from "../Images/commentSend.png";
import List from '@mui/material/List';
import likeIcon from "../Images/like.png";
import dislikelikeIcon from "../Images/unlike.png";
import { Fragment, useState, useContext, useEffect, useRef} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../auth";
import api from "../api";
import { useQuill } from 'react-quilljs';
import CommentSession from '../Components/CommentSession'


var addFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",right: '10%', backgroundImage: `url(${addFav})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };
var removeFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",right: '10%', backgroundImage: `url(${removeFav})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var downloadButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",right: '5%', backgroundImage: `url(${download})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var textStyle = {
    fontFamily: 'Love Ya Like A Sister',
    fontSize: 36
};

var likeButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",left: '5%', backgroundImage: `url(${likeIcon})`,
    backgroundPosition: 'left',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };
var dislikeButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",left: '10%', backgroundImage: `url(${dislikelikeIcon})`,
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
    const [likenum,setLikenum] = useState(0);
    const [dislikenum,setDislikenum] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked,setDisliked] = useState(false);
    const location = useLocation();
    var storyID = location.pathname.split("/").at(-1);
    const [favorited, setFavorited] = useState(false);
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

    useEffect(()=>{
        if(story !== null){
            setLikenum(story.likedUser.length);
            setDislikenum(story.dislikedUser.length);
            if(story.likedUser.includes(ctx.auth.user._id)){
                setLiked(true);
            }
            else if(story.dislikedUser.includes(ctx.auth.user._id)){
                setDisliked(true);
            }
            console.log(ctx.auth.user);
            if(ctx.auth.user.favoredStories.includes(storyID)){
                console.log("---");
                setFavorited(true);
            }
        }
    },story);


    const addFavorite = async ()=>{
        const response = await api.favorStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            ctx.auth.user.favoredStories = response.data.favoredStories;
            setFavorited(true);
        }
    };
    const removeFavorite = async ()=>{
        const response = await api.undoFavorStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            ctx.auth.user.favoredStories = response.data.favoredStories;
            setFavorited(false);
        }
    };
    const downloadStory = () => {
        ;
    }
    const addComment = () => {
        ;
    }
    const like = async () => {
        const response = await api.likeStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setDislikenum(response.data.dislikedUserArr.length);
            setLiked(true);
            setDisliked(false);
        }
    }
    const undolike = async()=>{
        const response = await api.undoLikeStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setLiked(false);
        }
    }
    
    const dislike = async () => {
        const response = await api.dislikeStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setDislikenum(response.data.dislikedUserArr.length);
            setLiked(false);
            setDisliked(true);
        }
    }

    const undodislike = async() =>{
        const response = await api.undoDislikeStory(storyID,{userID:ctx.auth.user._id, storyID: storyID});
        if(response.status === 200){
            setDislikenum(response.data.dislikedUserArr.length);
            setDisliked(false);
        }
    }

    return(
        <>
        <div  style={{background:"rgba(250, 241, 194, 1)", display:"flex", justifyContent: "center", flexDirection: "column"}} >
            <Header></Header>
            <div style={{ display: "flex",  position:"relative",flexDirection: "column", alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                
                {favorited?
                    <div style={removeFavButtonStyle} onClick={removeFavorite} className = "likedislikebutton"></div>
                    :
                    <div style={addFavButtonStyle} onClick={addFavorite} className = "likedislikebutton"></div>
                }
                <div style={downloadButtonStyle} onClick={downloadStory}></div>
                
                {liked?
                    <div style={likeButtonStyle} onClick={undolike} className = "likedislikebuttonpress"> {likenum} </div>
                    :
                    <div style={likeButtonStyle} onClick={like} className = "likedislikebutton"> {likenum} </div>
                }
                {disliked?
                    <div style={dislikeButtonStyle} onClick={undodislike} className = "likedislikebuttonpress"> {dislikenum} </div>
                    :
                    <div style={dislikeButtonStyle} onClick={dislike} className = "likedislikebutton"> {dislikenum} </div>
                }
            
                <div style={textStyle}>{story === null ?   "Story Title":story.storyTitle}</div>
                <div style={textStyle}>{story === null ?   "Author Name":story.authorName}</div>
            </div>

            <div style={{display:"flex", justifyContent: "center"}}>
                <div 
                    id="quill"
                    ref={quillRef}
                    style={{ 
                        width: "80vw",
                        height: "120vh",
                    }}/>
            </div>


            <div style={{display:"flex",justifyContent:"center", background: "rgba(250, 241, 194, 1)", marginBottom:"1rem", marginTop:"1rem"}}><Pagination count={10} color="primary" /></div>
            
            {/* <div style={{display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                <div style={commentTitle}>Comment</div>
                <div style={{height:"300px", width:"100%", background : "white", position:"relative"}}><div style={commendSentStyle} onClick={addComment}></div></div>
                
            </div>
            
            <div style={{display: "flex", justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                {commentList}
            </div> */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                <CommentSession isComic={false} comicOrStoryID={storyID}/>
            </div>
            
        </div>
        
        </>
        
    );
};   

export default StoryDetailPage;