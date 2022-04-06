import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import images from "../Images/index.js";
import Pagination from '@mui/material/Pagination';







const MyStory = ({itemsPerPage}) => {
  
  const [pageCount, setPageCount] = useState(5);
 

  
  const handlePageClick = (event) => {
    
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
        <b>My Storys:</b>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={()=>{alert(123);}} src={images.addComic}></img>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,300px))",
          justifyContent: "center",
        }}
      >
        
      <ComicCard></ComicCard>
      <ComicCard></ComicCard>
      <ComicCard></ComicCard>
      <ComicCard></ComicCard>
      <ComicCard></ComicCard>

      
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination count={10} color="primary" /></div>
      
    </div>
  );
};

export default MyStory;