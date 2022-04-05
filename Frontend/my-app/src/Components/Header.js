import  Form  from 'react-bootstrap/Form';
import easyToUse from "../Images/easyToUse.png"
import communityIcon from "../Images/communityIcon.png"
const Header = ()=>{

    return(
        <div style={{display:"flex", alignItems:"center",justifyContent:"space-between", padding:"1rem", background:"rgba(209, 247, 255, 1)"}}>
            <div style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
                <b style={{textShadow: "5px 5px 4px #8b8181"}}>EasyMaker</b>
                <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${easyToUse})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', marginLeft:"1rem"}} ></div>
            </div>
            
            
            <input placeholder='Search' style={{width:"500px", height:"20px", borderRadius:"0.3rem", border:"none", background:"rgba(168, 158, 171, 0.23)", outline:"none"}}>
                
            </input>
           
                           
           
                           
         
            <div>
            <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${communityIcon})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', marginLeft:"1rem", cursor:"pointer"}} ></div>
            
            </div>
        </div>
    );
};

export default Header;