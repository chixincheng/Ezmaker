import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import axios from "axios";
// require('dotenv').config();
import Pagination from "@mui/material/Pagination";
import images from "../Images/index.js";

const Playlist = () => {
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
        <img
          style={{ width: "35px", height: "auto", cursor: "pointer" }}
          onClick={() => {
            alert(123);
          }}
          src={images.playlistEdit}
        ></img>
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
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"0 0 0 1rem"}}>
          <img
            style={{ width: "100px", height: "auto", cursor: "pointer", marginBottom:"1rem" }}
            onClick={() => {
              alert(123);
            }}
            src={images.save}
          ></img>
          <img
            style={{ width: "100px", height: "auto", cursor: "pointer" }}
            onClick={() => {
              alert(123);
            }}
            src={images.deleteIcon}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
