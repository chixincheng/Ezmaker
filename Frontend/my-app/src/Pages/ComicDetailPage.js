import Header from "../Components/Header";
import addFav from "../Images/addFav.png";
import removeFav from "../Images/removeFav.png";
import download from "../Images/download.png";
import Pagination from '@mui/material/Pagination';
import commentSend from "../Images/commentSend.png";
import List from '@mui/material/List';
import likeIcon from "../Images/like.png";
import dislikelikeIcon from "../Images/unlike.png";
import { useNavigate, useLocation} from "react-router-dom";
import { Tldraw, TldrawApp, useFileSystem, TDDocument,  TDExport } from "@tldraw/tldraw";
import AuthContext from "../auth";
import { useContext,useRef,useState,useEffect } from "react";
import api from "../api";
import CommentSession from '../Components/CommentSession'


var addFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"20%",right: '15%', backgroundImage: `url(${addFav})`,
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

var commentTitle = {
    fontFamily: 'Ribeye Marrow',
    fontSize: 36
};
var commendSentStyle = {height:"50px", width:"80px", position:"absolute",  bottom:"-60px", right:"15px",backgroundImage: `url(${commentSend})`,
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

const ComicDetailPage = () => {
    const ctx = useContext(AuthContext);
    const rTLDrawApp =   new TldrawApp() ;
    const [read, setRead] = useState(false);
    const location = useLocation();
    var names = location.pathname.split("/");
    const navigate = useNavigate();
    const fileUploaderRef = useRef();
    const fileSystemEvents = useFileSystem();
    const [comic, setComic] = useState(null);
    const [likenum,setLikenum] = useState(0);
    const [dislikenum,setDislikenum] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked,setDisliked] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const getTLDR = async ()=>{
        const getComicResponse = await api.getPublishedComicByID( names.at(-1));
        
        if( getComicResponse.status !== 200 ){
            navigate("/comic/home");
        }
        setComic(getComicResponse.data.comic);
        const response = await fetch( getComicResponse.data.comic.filePath ).then((r)=>{r.text().then((d)=>{ 
        var temp = JSON.parse(d); 
        
        rTLDrawApp.current.loadDocument(temp.document);
        rTLDrawApp.current.zoomToFit();
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

    useEffect(()=>{
        if(comic !== null){
            setLikenum(comic.likedUser.length);
            setDislikenum(comic.dislikedUser.length);
            if(comic.likedUser.includes(ctx.auth.user._id)){
                setLiked(true);
            }
            else if(comic.dislikedUser.includes(ctx.auth.user._id)){
                setDisliked(true);
            }
            if(ctx.auth.user.favoredComics.includes(comic._id)){
                setFavorited(true);
            }
        }
    },comic);


    const handleMount = (app) => {
        rTLDrawApp.current = app; // [2]
    };
    const addFavorite = async ()=>{
        const response = await api.favorComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            ctx.auth.user.favoredComics = response.data.favoredComics;
            setFavorited(true);
        }
    };
    const removeFavorite = async ()=>{
        const response = await api.undoFavorComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            ctx.auth.user.favoredComics = response.data.favoredComics;
            setFavorited(false);
        }
    };
    const downloadComic = () => {
        ;
    }
    const addComment = () => {
        ;
    }
    
    const like = async () => {
        const response = await api.likeComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setDislikenum(response.data.dislikedUserArr.length);
            setLiked(true);
            setDisliked(false);
        }
    }
    const undolike = async()=>{
        const response = await api.undoLikeComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setLiked(false);
        }
    }
    
    const dislike = async () => {
        const response = await api.dislikeComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            setLikenum(response.data.likedUserArr.length);
            setDislikenum(response.data.dislikedUserArr.length);
            setLiked(false);
            setDisliked(true);
        }
    }

    const undodislike = async() =>{
        const response = await api.undoDislikeComic(names.at(-1),{userID:ctx.auth.user._id, comicID: names.at(-1)});
        if(response.status === 200){
            setDislikenum(response.data.dislikedUserArr.length);
            setDisliked(false);
        }
    }

    return(
        <>
            <div  style={{background:"rgba(250, 241, 194, 1)", display:"flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}} >
                <Header></Header>
                <div style={{ display: "flex", flexDirection: "column", width:"100%",position:"relative",alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                    {favorited?
                        <div style={addFavButtonStyle} onClick={removeFavorite} className = "likedislikebuttonpress"></div>
                        :
                        <div style={addFavButtonStyle} onClick={addFavorite} className = "likedislikebutton"></div>
                    }
                    
                    <div style={downloadButtonStyle} onClick={downloadComic}></div>
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
                
                        <div style={textStyle}>{comic === null ?   "Comic Title":comic.comicTitle}</div>
                        <div style={textStyle}>{comic === null ?   "Author Name":comic.authorName}</div>
                </div>
                <div
                    style={{
                        position: "relative",
                        width: "80vw",
                        height: "80vh"
                    }}
                    onClick={(e)=>{ console.log("123");}}
                    >
                    <Tldraw   showMenu={!read} showMultiplayerMenu={!read} showPages={true} readOnly={ read } 
                    onClick={()=>{console.log("456");}}{...fileSystemEvents}onMount={handleMount} />
                </div>
                <div style={{display:"flex",justifyContent:"center", background: "rgba(250, 241, 194, 1)", marginBottom:"1rem"}}><Pagination count={10} color="primary" /></div>
                
                
                {/* <div style={{display: "flex", width:"100%",flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                    <div style={commentTitle}>Comment</div>
                    <div style={{height:"300px", width:"100%", background : "white", position:"relative"}}><div style={commendSentStyle} onClick={addComment}></div></div>
                </div>
                
                <div style={{display: "flex",width:"100%" ,justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                    {commentList}
                </div> */}
                <CommentSession isComic={true} comicOrStoryID={names.at(-1)} />
            </div>
        </>
        
    );
};   

export default ComicDetailPage;