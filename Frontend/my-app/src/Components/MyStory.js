import StoryCard from "./StoryCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import images from "../Images/index.js";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";
import SortButton from "./SortButton.js";




const MyStory = ({itemsPerPage}) => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(5);
  const [stories, setStories] = useState([]);
  const ctx = useContext(AuthContext);
 
  const loadAllStories = async ()=>{
    const response = await api.getAllUserUnpublishedStories(ctx.auth.user._id);
    const response2 = await api.getAllUserPublishedStories(ctx.auth.user._id);
    var array = [...response.data.unpublishedStories,...response2.data.publishedStories]
    
    setStories(array);
  };
  
 
  useEffect(()=>{
    loadAllStories();
  },[]);

  const handlePageClick = (event) => {
    
  };


  const addStoryOnClick = async ()=>{
    var temp = {};
    temp["ops"] = [{"insert": "\n"}];
    var jsonObject = JSON.stringify(temp);
    var formData = new FormData();
    formData.append('quillFile', new File([ jsonObject ], "demo.json", {type: "text/plain;charset=utf-8"}));
    
    var payload = {
        authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        storyTitle: "Story Title Default"
    };
    
    const response2 = await api.createStory( formData, payload );
    
    if ( response2.status !== 201 ){
      alert(response2.data.message );
      navigate(0);
    }

    navigate(`/story/editing/${response2.data.story._id}`);
    
  };

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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>My Stories:</b>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={addStoryOnClick} src={images.addComic}></img>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,300px))",
          justifyContent: "center",
        }}
        
      >
      
      {stories.map((story, index)=>{
          
          return(<StoryCard key={index} story={story}></StoryCard>);
        })}

      
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination count={10} color="primary" /></div>
      
    </div>
  );
};

export default MyStory;
