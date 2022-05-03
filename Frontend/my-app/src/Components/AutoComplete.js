import React, { useContext,useState, useEffect } from 'react'
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


const AutoComplete2 = ({option, searchResult})=>{
   
    const location = useLocation();
    const navigate = useNavigate();
    const { store } = useContext(GlobalStoreContext);
    const title = `${location.pathname.split("/").at(1)}Title`;
    

    var options =  searchResult.map((item)=> item["userName"] );

    if( option !== "user" ){
        options = searchResult.map((item)=> item[title] );
    }
   
   const change = (e,value)=>{
       if(option === "user"){
            var id;
            for(var i = 0; i<searchResult.length;i++){
                if(searchResult[i].userName === value){
                    id = searchResult[i]._id;
                }
            }
            if( location.pathname.includes("comic") ){
                navigate(`/comic/user/${id}`); 
            }
            else if(location.pathname.includes("story")){
                navigate(`/story/user/${id}`); 
            }
       }
       else{
            var id;
            for(var i = 0; i<searchResult.length;i++){
                if(searchResult[i][title] === value){
                    
                    id = searchResult[i]._id;
                }
            }
            if( location.pathname.includes("comic") ){
                navigate(`/comic/detail/${id}`); 
            }
            else if(location.pathname.includes("story")){
                navigate(`/story/detail/${id}`);
            }
       }
   }


    function handleSearchKeyWord (event){
        store.setSearchKey(event.target.value);
    }

    return(<Autocomplete
        fullWidth
        disablePortal
        options={options}
        onChange={ change }
        renderInput={(params) => <TextField {...params}
            fullWidth
            id = "search-key"
            margin = "none"
            onChange = {handleSearchKeyWord}
            style = {{ background: "white", top: "13%"}}
        
        >
        </TextField>}
    >
    </Autocomplete>);
};


export default AutoComplete2;