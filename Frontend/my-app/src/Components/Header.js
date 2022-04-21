import React, { useContext,useState } from 'react'
import { GlobalStoreContext } from '../store'
import easyToUse from "../Images/easyToUse.png"
import communityIcon from "../Images/communityIcon.png"
import {useNavigate, useLocation} from "react-router-dom"
import userIcon from "../Images/icon.png"
import { Fragment } from 'react';
import { Box } from '@mui/system';
import { MenuItem, TextField } from '@mui/material';
import { Select } from '@mui/material'
import { Autocomplete } from '@mui/material'
import images from '../Images';
import AuthContext from '../auth';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';


const Header = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { store,searchResult } = useContext(GlobalStoreContext);
    const [option,setOption] = React.useState('user');
    const ctx = useContext(AuthContext);
    const [popupopen, setPopUpOpen] = useState(false);
    const [navigatePage, setNavigatePage] = useState("");

    const handleDashboardNavigate =()=>{
        if(location.pathname.includes("editing")){
            setPopUpOpen(true);
            setNavigatePage("dashboard");
        }
        else{
            navigateDashboard();
        }
    }
    const navigateDashboard=()=>{
        navigate("/");
    }
    const communityIconOnClick = ()=>{
        if(location.pathname.includes("editing")){
            setPopUpOpen(true);
            setNavigatePage("community");
        }
        else{
            navigateCommunity();
        }
    };
    const navigateCommunity=()=>{
        if( location.pathname.includes("comic") ){
            navigate("/comic/community");
        }
        else if(location.pathname.includes("story")){
            navigate("/story/community");
        }
    }
    const userIconOnClick =() =>{
        if(location.pathname.includes("editing")){
            setPopUpOpen(true);
            setNavigatePage("home");
        }
        else{
            navigateHomePage();
        }
    }
    const navigateHomePage =()=>{
        if( location.pathname.includes("comic") ){
            navigate("/comic/home");
        }
        else if(location.pathname.includes("story")){
            navigate("/story/home");
        }
    }

    function handleSearchKeyWord (event){
        store.setSearchKey(event.target.value);
    }

    function handleSearchOption (event){
        store.setSearchOption(event.target.value);
        setOption(event.target.value);
    }

    function handleNavigate (event){
       
        //store.searchNavigate(event.target.value);
    }
    const logoutIconOnClick = ()=>{
        if(location.pathname.includes("editing")){
            setPopUpOpen(true);
            setNavigatePage("logout");
        }
        else{
            ctx.auth.logoutUser();
        }
    }
      
    function handleDeleteClose (event){
        event.stopPropagation();
        setPopUpOpen(false);
        setNavigatePage("");
    };

    const navigateHelper = async(event)=>{
        event.preventDefault();
        if(navigatePage === 'community'){
            navigateCommunity();
        }
        else if(navigatePage === 'home'){
            navigateHomePage();
        }
        else if(navigatePage === 'dashboard'){
            navigateDashboard();
        }
        else if(navigatePage === 'logout'){
            ctx.auth.logoutUser();
        }
      }

    return(
        <div style={{display:"flex", alignItems:"center",justifyContent:"space-between", padding:"1rem", background:"rgba(209, 247, 255, 1)"}}>
            <div onClick={()=>{handleDashboardNavigate()}} style={{display:"flex", alignItems:"center", cursor:"pointer"}}>
                <b style={{textShadow: "5px 5px 4px #8b8181"}}>EasyMaker</b>
                <div style={{  width:"50px", height:"50px" ,backgroundImage: `url(${easyToUse})`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', marginLeft:"1rem"}} ></div>
            </div>
            
            {(location.pathname.includes("home") || location.pathname.includes("community")) ?
                (<Box style={{width: "45%", display: "flex",alignItems:"center"}}>
                    <Select
                        label="user"
                        value = {option}
                        onChange={handleSearchOption}
                        style = {{ background: "white"}}
                    >
                        <MenuItem value = "user">User</MenuItem>
                        <MenuItem value ="cs">Comic/Story</MenuItem>
                    </Select>
                    <Autocomplete
                        fullWidth
                        disablePortal
                        options={ searchResult.map((item)=> item["userName"] ) }
                        onInputChange={handleNavigate}
                        onChange={(e,value)=>{ 
                            console.log(value);
                            if( location.pathname.includes("comic") ){
                                navigate(`/comic/user/${value}`); 
                            }
                            else if(location.pathname.includes("story")){
                                navigate(`/story/user/${value}`); 
                            }
                            
                        }}
                        renderInput={(params) => <TextField {...params}
                            fullWidth
                            id = "search-key"
                            label = "search"
                            margin = "none"
                            onChange = {handleSearchKeyWord}
                            style = {{ background: "white", top: "13%"}}
                           
                        >
                        </TextField>}
                    >
                    </Autocomplete>
                </Box>)
                :
                <Fragment></Fragment>
            }    
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display:"flex", alignItems:"center", flexDirection:"column", marginRight: "2rem", cursor:"pointer"}}>
                    <div onClick={userIconOnClick} style={{  width:"50px", height:"50px" , borderRadius:"50%" ,backgroundImage: `url(${ctx.auth.user.profilePicture})`, backgroundPosition: 'center', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', marginLeft:"1rem"}}>
                    </div>
                    <b style={{fontFamily:"Ribeye Marrow"}}>Home</b>
                </div>
                <div style={{display:"flex", alignItems:"center", flexDirection:"column", marginRight: "2rem", cursor:"pointer"}}>
                    <div onClick={communityIconOnClick} style={{  width:"50px", height:"50px" ,backgroundImage: `url(${communityIcon})`, backgroundPosition: 'center', backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat', marginLeft:"1rem"}}>
                    </div>
                    <b style={{fontFamily:"Ribeye Marrow"}}>Community</b>
                </div>
                <div style={{display:"flex", alignItems:"center", flexDirection:"column", cursor:"pointer"}}>
                    <div onClick={logoutIconOnClick} style={{  width:"50px", height:"50px" ,backgroundImage: `url(${images.logout})`, backgroundPosition: 'center', backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat', marginLeft:"1rem"}}>
                    </div>
                    <b style={{fontFamily:"Ribeye Marrow"}}>Log Out</b>
                </div>
            </div>
                <Dialog
                    id = "save-modal"
                    maxWidth='sm'
                    open= {popupopen}
                    onClose={(event)=>{handleDeleteClose(event);}}
                >
                <DialogTitle>
                    Please save before leaving the editing page!!!
                <DialogActions>
                        <Button onClick={(event)=>{navigateHelper(event);}}>I already saved</Button>
                        <Button onClick={(event)=>{handleDeleteClose(event);}}>I will go save now</Button>
                    </DialogActions>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default Header;