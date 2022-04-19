
import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import images from "../Images/index.js";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";
import { useContext } from "react";



const MyComic = ({itemsPerPage}) => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(5);
  
  const ctx = useContext(AuthContext);

  

  
  const handlePageClick = (event) => {
    
  };

  const handleCreateComic = (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('tldrFile', new File([], "demo.tldr", {type: "text/plain;charset=utf-8"}) );
    var payload = {
        authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        comicTitle: "Comic Title Default"
    };
    const response = api.createComic(  formData, payload );
    if(response.status === 201){
      console.log(response.status);
      var id = response.status.comic._id;
      //navigate("/comic/editing:{id}");
      navigate("/comic/editing");
    }
  }

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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>My Comics:</b>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={(event)=>{handleCreateComic(event);}} src={images.addComic}></img>
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

export default MyComic;