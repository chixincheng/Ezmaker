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
const downloadComic = () => {
    ;
}
const addComment = () => {
    ;
}

var textSample = `Night slowly settled in a quiet manner and bright stars began to appear.

On the hillside, a child about six years old was standing in a strange position. The child’s feet were stretched apart, toes touching the ground with the heels lifted, hands raised high above the head, his head tilted up, and faint spiritual energy constantly circled within his small body.

Moonlight shone down, enveloping the child’s body.

The boy continued his practice in this bizarre position, inhaling spiritual energy into his body, letting it flow along his meridians.

Night slowly passed.

As the moonlight faded, replaced by the first rays of sunshine, the child slowly lowered his palms. His eyes opened to reveal deep, dark pupils that seemed to have a sharp golden glint deep within them.

Huang Xiaolong breathed out a mouthful of foul air, his eyes staring at the rising sun. From the day he was born to the present day, it had been seven years since he came to this world. He started practicing the Body Metamorphose Scripture at the age of three. Now four years later, he had managed to reach the Third Stage: Palm Propping the Sky Gate.

In his previous life, his ancestors had trained under the banner of the Shaolin Temple and the Body Metamorphose Scripture was an inheritance from his ancestors. Until now, Huang Xiaolong had been unable to understand the reason why someone like him, who was hailed as a martial arts prodigy in his time, was brought to this world.

And the matter that depressed Huang Xiaolong the most was that he awoke in the body of a newborn baby.

`;

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
    return(
        <div  style={{background:"rgba(250, 241, 194, 1)", display:"flex", flexDirection:"column"}} >
            <Header></Header>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                <div style={addFavButtonStyle} onClick={addFavorite}></div>
                <div style={removeFavButtonStyle} onClick={removeFavorite}></div>
                <div style={downloadButtonStyle} onClick={downloadComic}></div>
                <div style={textStyle}>Naruto</div>
                <div style={textStyle}>By Masashi Kishimoto</div>
            </div>
            <div style={{background: "rgba(250, 241, 194, 1)", display: "flex", padding:"1rem"}}>
                <p style={{ fontFamily: "Love Ya Like A Sister", fontSize: "14px", fontStyle: "normal", fontVariant: "normal", fontWeight: "400", lineHeight: "20px" }} >{textSample}</p>
            </div>
            <div style={{display:"flex",justifyContent:"center", background: "rgba(250, 241, 194, 1)", marginBottom:"1rem"}}><Pagination count={10} color="primary" /></div>
            
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                <div style={commentTitle}>Comment</div>
                <div style={{height:"300px", width:"1000px", background : "white", position:"relative"}}><div style={commendSentStyle} onClick={addComment}></div></div>
                
            </div>
            
            <div style={{display: "flex", justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
                {commentList}
            </div>
        </div>
    );
};   

export default StoryDetailPage;