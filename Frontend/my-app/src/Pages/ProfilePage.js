import { letterSpacing } from "@mui/material";
import Header from "../Components/Header";
import userIcon from "../Images/icon.png"



const editProfilePicture = () => {
    ;
}

const editName = () => {
    ;
}

const editEmailAddress = () => {
    ;
}

const editUserName = () => {
    ;
}

const editPassword = () => {
    ;
}

const editDOB = () => {
    ;
}

const editGender = () => {
    ;
}
var name = "David lee";
var email ="davidlee@gmail.com";
var username ="Lee";
var password ="**********";
var DOB ="01/11/1999";
var gender ="Male";


const ProfilePage = () => {
    return(
        <div>
            <Header></Header>
            <div id="profilePage">
                <div style={{width: "60vh"}}>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"20px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>Profile Picture:</p>
                            <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${userIcon})`, backgroundPosition: 'center', backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat', cursor:"pointer"}} >
                            </div>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editProfilePicture}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>Name:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{name}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>Email Address:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{email}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>User Name:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{username}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>Password:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{password}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>DOB:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{DOB}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop:"60px"}}>
                        <div style={{display: "flex"}}>
                            <p style={{fontSize: 16, fontFamily: "Ribeye Marrow", marginRight: "20px", marginLeft: "20px"}}>Gender:</p>
                            <p style={{fontSize: 16, fontWeight: 700}}>{gender}</p>
                        </div>
                        <div style={{fontSize:26, background: "rgba(187,241,253,255)", width: "120px",height: "40px", textAlign: "center", marginTop: "10px",marginLeft:"160px"}}
                            onClick={editName}
                        >
                            Edit</div>
                    </div>
                </div>
                <div style={{width: "40vh", float:"right", marginTop: "10vh"}}>
                    <div style={{height:"40vh" ,backgroundImage: `url(${userIcon})`, backgroundPosition: 'center', backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat', cursor:"pointer"}} >
                    </div>
                </div>
            </div>
        </div>
    );
};   

export default ProfilePage;