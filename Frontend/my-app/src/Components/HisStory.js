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




const HisStory = ({itemsPerPage}) => {
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
    const response2 = await api.getAllUserPublishedStories(location.pathname.split("/").at(-1));
    setStories(response2.data.publishedStories);
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>Stories:</b>
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

export default HisStory;
