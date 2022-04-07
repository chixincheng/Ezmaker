import cover1 from "../Images/cover1.png";
import clock from "../Images/clock.png";
import check from "../Images/check.png";
import { useNavigate, useLocation } from "react-router-dom";


const ComicCard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const cardOnClick = ()=>{
    if( location.pathname.includes("comic") ){
      navigate("/comic/detail");
    }
    else if( location.pathname.includes("story") ){
      navigate("/story/detail");
    }
  };

  var viewnumber = 222;

  
  return (
    <div  onClick={cardOnClick} style={{ margin: "2rem", cursor:"pointer" }}>
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
      <img src={cover1} style={{width:"100%", height:"auto"}}>
      </img>

      <div>
        <div style={{ textAlign: "center" }}>
          <b>Title</b>
        </div>
        {!props.publishedTime ? (
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
        ) : (
          <div style={{display:"flex"}}>
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
            <b style={{color:"green", margin: "0 0.5rem 0 0.5rem"}}>Published on</b>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicCard;
