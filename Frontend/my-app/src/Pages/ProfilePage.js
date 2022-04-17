import { letterSpacing } from "@mui/material";
import Header from "../Components/Header";
import userIcon from "../Images/icon.png"
import { useState, useContext, useRef } from "react";
import AuthContext from "../auth";
import { Fragment } from "react";
import ProfileRow from "../Components/ProfileRow";
import api from "../api";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {

    const fileUploaderRef = useRef();
    const navigate = useNavigate();

    const ctx = useContext(AuthContext);
    const { firstName, lastName, email, userName, passwordHash, profilePicture, _id } = ctx.auth.user;
    console.log(ctx);


    const fileUploadOnClick = async ()=>{
        const formData = new FormData();
        formData.append('imgFile', fileUploaderRef.current.files[0] );
        const response = await api.updateUserById(_id, null , formData );
        if ( response.status===200 ){
            alert("Successfully updated profile picture.");
            navigate(0);
        }
        else{
            alert("Failed to updat profile picture.");
        }
    }

    return(
        <Fragment>
            <Header></Header>
            <div id="profilePage">
                <div style={{width: "60vw"}}>
                    <ProfileRow label="Username" value={userName} _id={_id} user={ctx.auth.user} field="userName" ></ProfileRow>
                   <ProfileRow label="First Name" value={firstName} _id={_id} user={ctx.auth.user} field="firstName" ></ProfileRow>
                   <ProfileRow label="Last Name" value={lastName} _id={_id} user={ctx.auth.user} field="lastName" ></ProfileRow>
                   
                   <ProfileRow label="Email" value={email} _id={_id} user={ctx.auth.user} field="email" ></ProfileRow>
                   <ProfileRow label="Password" value={passwordHash} _id={_id} user={ctx.auth.user} field="password" ></ProfileRow>
                    
                
                </div>
                <div style={{width: "40vw", float:"right", marginTop: "10vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {/* <div onClick={()=>{}} style={{height:"40vh" ,width:"40vw",backgroundImage: `url(${profilePicture})`, backgroundPosition: 'center', backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat', cursor:"pointer", marginBottom:"5rem", borderRadius:"5rem"}} >
                    </div> */}
                  
                    <img alt="Avatar" src={profilePicture} style={{width:"50%", height:"auto", borderRadius:"50%"}}>
                    </img>
                 
                    <label for="img">Select icon image:</label>
                    <input type="file" id="img" name="img"  ref={fileUploaderRef} accept="image/*"/>
                    <input onClick={fileUploadOnClick} type="submit"/>
                    
                </div>
            </div>
        </Fragment>
    );
};   

export default ProfilePage;