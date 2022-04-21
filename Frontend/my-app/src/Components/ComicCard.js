import cover1 from "../Images/cover1.png";
import clock from "../Images/clock.png";
import check from "../Images/check.png";
import { useNavigate, useLocation } from "react-router-dom";


const ComicCard = ( props ) => {
  
  const {comic} = props;
  const location = useLocation();
  const navigate = useNavigate();
  var today;
  if(comic.updatedAt){
    today = comic.updatedAt.split("T")[0];
  }else{
    today = comic.publishedTime.split("T")[0];
  }


  const cardOnClick = ()=>{
    if( location.pathname.includes("comic") ){

      if( comic.viewNumber === undefined ){
        navigate(`/comic/editing/${comic._id}`);
      }
      else{
        navigate(`/comic/detail/${comic._id}`);
      }
      
    }
    else if( location.pathname.includes("story") ){
      navigate("/story/detail");
    }
  };

  var viewnumber = 222;

  
  return (
    <div  onClick={cardOnClick} style={{ margin: "2rem", cursor:"pointer", border:"1px black solid", background:"white" }}>
      {/* <div
        style={{
          width: "100%",
          height: "100%",
          minHeight:"190px",
         
          backgroundImage: `url(${cover1})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div> */}
      <img src={  props.comic.coverPage   ?   props.comic.coverPage: "https://res.cloudinary.com/daufq6nuh/image/upload/c_scale,h_5000,w_3500/v1650580213/Ezmaker/WeChat_Image_20220421182906_etv2nu.png" } style={{width:"100%", height:"auto"}}>
      </img>

      <div>
        <div style={{ textAlign: "center" }}>
          <b>{props.comic.comicTitle}</b>
        </div>
        {!props.comic.publishedTime ? (
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            {" "}
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundImage: `url(${clock})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
            {location.pathname.includes("community") ?
              <b style={{color:"orange", margin: "0 0.5rem 0 0.5rem"}}>View Number: {viewnumber}</b>
              :
              <b style={{color:"orange", margin: "0 0.5rem 0 0.5rem"}}>Last Edited on {today}</b>
            }
          </div>
        ) 
        : (
          <div style={{display:"flex", justifyContent:"center"}}>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundImage: `url(${check})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>{" "}
            <b style={{color:"green", margin: "0 0.5rem 0 0.5rem"}}>Published on {today}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicCard;
