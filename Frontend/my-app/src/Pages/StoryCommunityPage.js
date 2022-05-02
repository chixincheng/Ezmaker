import StoryCard from "../Components/StoryCard";
import Pagination from '@mui/material/Pagination';
import Header from "../Components/Header";
import { Fragment } from "react";
import images from "../Images";
import React, { useEffect, useState, useContext } from 'react';
import api from "../api";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IconButton } from '@mui/material'

const StoryCommunityPage = ()=>{

  const [stories, setStories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const loadAllStories = async ()=>{
    const response = await api.getCommunityStories();
    console.log(response);
    var array = [...response.data.stories]
    setStories(array);
  };
  
  useEffect(()=>{
    loadAllStories();
  },[]);

  function handleSortByNewestDate(){
    setAnchorEl(null);
    let pair = stories.sort(
      function(a,b){
        let date1 = new Date(a.publishedTime);
        let date2 = new Date(b.publishedTime);
        return date2-date1;
      }
    );
    setStories(pair);
  }

  function handleSortByOldestDate(){
    setAnchorEl(null);
    let pair = stories.sort(
      function(a,b){
        let date1 = new Date(a.publishedTime);
        let date2 = new Date(b.publishedTime);
        return date1-date2;
      }
    );
    setStories(pair);
  }

  function handleSortByViews(){
    setAnchorEl(null);
    // let pair = stories.sort(
    //   function(a,b){
    //     let num1 = a.viewNumber;
    //     let num2 = b.viewNumber;
    //     return num2-num1;
    //   }
    // );
    // setStories(pair);
  }

  function handleSortByLikes(){
    setAnchorEl(null);
    // let pair = stories.sort(
    //   function(a,b){
    //     let num1 = a.likedUser.length;
    //     let num2 = b.likedUser.length;
    //     return num2-num1;
    //   }
    // );
    // setStories(pair);
  }

  function handleSortByDislikes(){
    setAnchorEl(null);
    // let pair = stories.sort(
    //   function(a,b){
    //     let num1 = a.dislikedUser.length;
    //     let num2 = b.dislikedUser.length;
    //     return num2-num1;
    //   }
    // );
    // setStories(pair);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menulist = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
            <MenuItem onClick={handleSortByNewestDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByOldestDate}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleSortByViews}>Views</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortByDislikes}>Dislikes</MenuItem>
    </Menu>
  );

  return(<Fragment>
    <Header></Header>
    <div style={{background: "rgba(250, 241, 194, 1)", float:"right", marginTop: "15px", marginRight: "15px"}}>
            <IconButton
                    color="inherit" 
                    aria-label="sortby"
                    id="sortby-list-button"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    size = "large"
                    onClick={handleProfileMenuOpen}
                >
                    Sort <img style={{width:"50px", height:"auto"}} src={images.sort}></img>
            </IconButton>
            {menulist}
    </div>
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