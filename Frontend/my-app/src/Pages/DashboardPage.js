import { useNavigate } from "react-router-dom";
import comicApp from "../Images/comicApp.png";
import storyApp from "../Images/storyApp.png";
import dashboard from "../Images/dashBoardBackground.jpg";

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw", height: "100vh",backgroundImage: `url(${dashboard})`,
            backgroundRepeat: "no-repeat",backgroundPosition: "center",backgroundSize: "cover"
    }}>
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <button style={{ width: "50vw", height: "50vh", backgroundImage:`url(${comicApp})`, 
            backgroundPosition: "center",backgroundSize: "cover", backgroundRepeat: "no-repeat", cursor: "pointer" }} 
            
            onClick={() => { navigate("/comic/home"); }}>
            </button>
            <b style={{fontFamily: "Love Ya Like A Sister", fontSize: 40}}>Comic App</b>
        </div>
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <button style={{ width: "50vw", height: "50vh", backgroundImage:`url(${storyApp})`,
            backgroundPosition: "center",backgroundSize: "cover", backgroundRepeat: "no-repeat", cursor: "pointer" }} 
            
            onClick={() => { navigate("/story/home"); }}>
            </button>
            <b style={{fontFamily: "Love Ya Like A Sister", fontSize: 40}}>Story App</b>
        </div>
    </div>);
};

export default DashboardPage;
