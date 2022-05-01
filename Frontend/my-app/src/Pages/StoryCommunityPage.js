import StoryCard from "../Components/StoryCard";
import Pagination from '@mui/material/Pagination';
import Header from "../Components/Header";
import { Fragment } from "react";
import images from "../Images";
import SortButton from "../Components/SortButton";
import React, { useEffect, useState, useContext } from 'react';
import api from "../api";

const StoryCommunityPage = ()=>{

  const [stories, setStories] = useState([]);

  const loadAllStories = async ()=>{
    const response = await api.getCommunityStories();
    console.log(response);
    var array = [...response.data.stories]
    setStories(array);
  };
  
  useEffect(()=>{
    loadAllStories();
  },[]);

    return(<Fragment>
      <Header></Header>
      <SortButton></SortButton>
      <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(100px,500px))",
          justifyContent: "center",
        }}
      >
         {stories.map((story, index)=>{
          
          return(<StoryCard key={index} story={story}></StoryCard>);
        })}

      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination count={10} color="primary" /></div>
    
        
      </div>
    </Fragment>);
};

export default StoryCommunityPage;