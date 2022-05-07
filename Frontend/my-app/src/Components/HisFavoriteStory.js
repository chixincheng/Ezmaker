import StoryCard from "./StoryCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import images from "../Images/index.js";
import { useNavigate,useLocation } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";




const HisFavoriteStory = ({itemsPerPage}) => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(5);
  const [stories, setStories] = useState([]);
  const ctx = useContext(AuthContext);
  const location = useLocation();
  const [ myPage , setMyPage] = useState(1);
  const setPage = (e, p) => {
    setMyPage(p);
  }
  const loadAllStories = async ()=>{
    var response = await api.getUserById(location.pathname.split("/").at(-1));
    const storyid = response.data.user.favoredStories;
    var storyarr = [];
    for(var i = 0;i<storyid.length;i++){
      response = await api.getPublishedStoryByID(storyid[i]);
        if(response.data.success){
          storyarr.push(response.data.story);
        }
    }    
    setStories(storyarr);
  };
  
 
  useEffect(()=>{
    loadAllStories();
  },[]);


  return (
    <div
      style={{
        padding: "2rem 1rem 2rem 1rem",
        background: "rgba(187, 241, 253, 1)",
        borderRadius: "1rem",
        marginBottom:"1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "2rem",
        }}
      >
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>Favorited Stories:</b>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,350px))",
          justifyContent: "center",
        }}
        
      >
      
      {stories.map((story, index)=>{
          if( Math.floor(index/6)+1  === myPage ){
            return(<StoryCard key={index} story={story}></StoryCard>);
          }
          
        })}

      
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination  onChange={setPage} page={myPage} count={ Math.ceil(stories.length/ 6)  } color="primary" /></div>
      
    </div>
  );
};

export default HisFavoriteStory;
