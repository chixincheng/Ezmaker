import StoryCard from "./StoryCard";
import React, { useEffect, useState, useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import api from "../api";
import AuthContext from "../auth";




const MyFavoriteStory = ({itemsPerPage}) => {

  const [stories, setStories] = useState([]);
  const ctx = useContext(AuthContext);
 
  const loadAllStories = async ()=>{
    var response = await api.getUserById(ctx.auth.user._id);
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>My Favorite Stories:</b>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,350px))",
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

export default MyFavoriteStory;
