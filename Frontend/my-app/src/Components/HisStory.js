import ComicCard from "./ComicCard";
import React, { useEffect, useState } from 'react';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";


const HisStory = ({itemsPerPage}) => {

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

export default HisStory;