import Header from "../Components/Header";
import addFav from "../Images/addFav.png";
import removeFav from "../Images/removeFav.png";
import download from "../Images/download.png";
import Pagination from '@mui/material/Pagination';
import rightimage from "../Images/comicsDetailSample.png";
import leftimage from "../Images/comicsDetailSample2.png";
import commentSend from "../Images/commentSend.png";
import List from '@mui/material/List';


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
var images1 = { height:"800px", width:"1000px",  backgroundImage: `url(${leftimage})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
};
var images2 = { height:"800px", width:"1000px", backgroundImage: `url(${rightimage})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
};
var commentTitle = {
    fontFamily: 'Ribeye Marrow',
    fontSize: 36
};
var commendSentStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(125vh - 35px)", left: 'calc(7vw - 45px)',backgroundImage: `url(${commentSend})`,
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
const downloadComic = () => {
    ;
}
const addComment = () => {
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

const ComicDetailPage = () => {
    return(
        <div  style={{background:"rgba(250, 241, 194, 1)"}} >
            <Header></Header>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                <div style={addFavButtonStyle} onClick={addFavorite}></div>
                <div style={removeFavButtonStyle} onClick={removeFavorite}></div>
                <div style={downloadButtonStyle} onClick={downloadComic}></div>
                <div style={textStyle}>Naruto</div>
                <div style={textStyle}>By Masashi Kishimoto</div>
            </div>
            <div style={{background: "rgba(250, 241, 194, 1)", display: "flex", padding:"1rem"}}>
                <img style={{width:"50%"}} src={leftimage}></img>
                <img style={{width:"50%"}} src={rightimage}></img>
            </div>
            <div style={{display:"flex",justifyContent:"center", background: "rgba(250, 241, 194, 1)", marginBottom:"1rem"}}><Pagination count={10} color="primary" /></div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                <div style={commentTitle}>Comment</div>
                <div style={{height:"300px", width:"1000px", background : "white"}}></div>
            </div>
            <div style={commendSentStyle} onClick={addComment}></div>
            <div style={{display: "flex", justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                {commentList}
            </div>
        </div>
    );
};   

export default ComicDetailPage;