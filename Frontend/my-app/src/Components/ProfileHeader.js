import easyToUse from "../Images/easyToUse.png"
import userIcon from "../Images/icon.png"

const ProfileHeader = ()=>{

    return(
        <div style={{display:"flex", alignItems:"center",justifyContent:"space-between", padding:"1rem", background:"rgba(209, 247, 255, 1)"}}>
            <div style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
                <b style={{textShadow: "5px 5px 4px #8b8181"}}>EasyMaker</b>
                <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${easyToUse})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', marginLeft:"1rem"}} ></div>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${userIcon})`, backgroundPosition: 'center', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', cursor:"pointer", marginRight: "10px"}} >
                </div>
                <p style={{fontSize: 16, fontWeight: 700, marginRight: "100px"}}>Lee</p>
            </div>
        </div>
    );
};

export default ProfileHeader;