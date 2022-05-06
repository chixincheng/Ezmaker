import ComicCard from "./ComicCard";
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
import { Tldraw, TldrawApp, useFileSystem, TDDocument,  TDExport } from "@tldraw/tldraw";



const MyComic = ({itemsPerPage}) => {
  const rTLDrawApp =   new TldrawApp() ;
  const navigate = useNavigate();
  
  const [comics, setComics] = useState([]);
  const ctx = useContext(AuthContext);
  const [ myPage , setMyPage] = useState(1);
  const setPage = (e, p) => {
    setMyPage(p);
  }

  const loadAllComics = async ()=>{
    const response = await api.getAllUserUnpublishedComics(ctx.auth.user._id);
    const response2 = await api.getAllUserPublishedComics(ctx.auth.user._id);
    var array = [...response.data.unpublishedComics,...response2.data.publishedComics]
    setComics(array);
  };

  useEffect(()=>{
    loadAllComics();
  },[]);
  
  const addComicOnClick = async ()=>{
    const app = rTLDrawApp;

    var temp = {};
    temp["document"] = app.document;
    var jsonObject = JSON.stringify(temp);
    var formData = new FormData();
    formData.append('tldrFile', new File([ jsonObject ], "demo.tldr", {type: "text/plain;charset=utf-8"})  );
    
    var payload = {
      authorID: ctx.auth.user._id ,
        authorName: ctx.auth.user.userName ,
        editedTime: new Date() ,
        comicTitle: "Comic Title Default"
    };

    const response2 = await api.createComic(  formData, payload );
    if ( response2.status !== 200 ){
      alert( response2.data.message );
      navigate(0);
    }

    navigate(`/comic/editing/${response2.data.comic._id}`);
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>My Comics:</b>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={addComicOnClick} src={images.addComic}></img>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,350px))",
          justifyContent: "center",
        }}
      >
        {comics.map((comic, index)=>{
          if( Math.floor(index/6)+1  === myPage ){
            return(<ComicCard key={index} comic={comic}></ComicCard>);
          }
          
        })}

       
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination setPage={setPage} page={myPage} count={ Math.ceil(comics.length/ 6)  } color="primary" /></div>
    </div>
  );
};

export default MyComic;