import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import axios from "axios";
// require('dotenv').config();
import Pagination from "@mui/material/Pagination";
import images from "../Images/index.js";

const HisPlaylist = () => {
  return (
    <div
      style={{
        padding: "2rem 1rem 2rem 1rem",

        borderRadius: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems:"center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <b style={{ marginRight: "1rem", fontFamily: "Ribeye Marrow", fontSize: 20}}>Playlist A</b>
       
      </div>

      <div style={{display:"flex"}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px,300px))",
            justifyContent: "center",
            background: "rgba(187, 241, 253, 1)",
            width:"100%"
          }}
        >
          <ComicCard></ComicCard>
          <ComicCard></ComicCard>
          <ComicCard></ComicCard>
          <ComicCard></ComicCard>
          <ComicCard></ComicCard>
        </div>
        
      </div>
    </div>
  );
};

export default HisPlaylist;
