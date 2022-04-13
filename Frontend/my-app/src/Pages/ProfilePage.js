import { letterSpacing } from "@mui/material";
import Header from "../Components/Header";
import userIcon from "../Images/icon.png"
import { useState, useContext } from "react";
import AuthContext from "../auth";
import { Fragment } from "react";
import ProfileRow from "../Components/ProfileRow";
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

    const [editingFirstName, setEditingFirstName] = useState(false);
    const [editingLastName, setEditingLastName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editingProfilePic, setEditingProfilePic] = useState(false);

    const ctx = useContext(AuthContext);
    const { firstName, lastName, email, userName, passwordHash, profilePic, _id } = ctx.auth.user;
    console.log(ctx);
    return(
        <Fragment>
            <Header></Header>
            <div id="profilePage">
                <div style={{width: "60vw"}}>
                   <ProfileRow label="First Name" value={firstName} _id={_id} user={ctx.auth.user} field="firstName" ></ProfileRow>
                   <ProfileRow label="Last Name" value={lastName} _id={_id} user={ctx.auth.user} field="lastName" ></ProfileRow>
                   <ProfileRow label="Username" value={userName} _id={_id} user={ctx.auth.user} field="userName" ></ProfileRow>
                   <ProfileRow label="Email" value={email} _id={_id} user={ctx.auth.user} field="email" ></ProfileRow>
                   <ProfileRow label="Password" value={passwordHash} _id={_id} user={ctx.auth.user} field="password" ></ProfileRow>
                    
                
                </div>
                <div style={{width: "40vw", float:"right", marginTop: "10vh"}}>
                    <div style={{height:"40vh" ,backgroundImage: `url(${userIcon})`, backgroundPosition: 'center', backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat', cursor:"pointer"}} >
                    </div>
                </div>
            </div>
        </Fragment>
    );
};   

export default ProfilePage;