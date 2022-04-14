import ComicCard from "./ComicCard";
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

const HisFavoriteStory = ({itemsPerPage}) => {


  return (
    <div
      style={{
        padding: "2rem 1rem 2rem 1rem",
        background: "rgba(187, 241, 253, 1)",
        borderRadius: "1rem",
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>His Favorite Stories:</b>
        
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

export default HisFavoriteStory;