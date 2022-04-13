import landPageBackground from "../Images/landingPageBackground.jpg"
import loginButtonBackground from "../Images/loginButton.png"
import makingForEveryone from "../Images/makingForEveryone.png"
import weAllAreListening from "../Images/weAllAreListening.png"
import {useNavigate} from "react-router-dom"
import AuthContext from "../auth"
import { useContext } from "react"

const LandingPage =  () =>{
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    var buttonStyle = {height:"100px", width:"200px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(50vw - 100px)', backgroundImage: `url(${loginButtonBackground})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };

   const loginOnClick = ()=>{
        navigate("/login");
   };

   if( ctx.loggedIn ){
        navigate("/dashboard");
   }

  return (
    <div style={{backgroundImage: `url(${landPageBackground})`, width:"100vw", height:"100vh", backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: "flex",
    position:"relative"
    }} >
    
    <div style={buttonStyle} onClick={loginOnClick}></div>
  
    <div style={{ position:"absolute", width:"500px", height:"100px" ,backgroundImage: `url(${makingForEveryone})`, backgroundPosition: 'center', backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat', bottom:"15vh", left:"25vw"}} ></div>
    
    <div style={{ position:"absolute", width:"500px", height:"100px" ,backgroundImage: `url(${weAllAreListening})`, backgroundPosition: 'center', backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat', bottom:"5vh", right:"25vw"}} ></div>
    
    </div>

    
    
  );
}

export default LandingPage;