import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import images from "../Images/index.js";
import { useNavigate,useLocation } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";
import { Tldraw, TldrawApp, useFileSystem, TDDocument,  TDExport } from "@tldraw/tldraw";



const HisFavoriteComic = ({itemsPerPage}) => {
  const rTLDrawApp =   new TldrawApp() ;
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(5);
  const [comics, setComics] = useState([]);
  const ctx = useContext(AuthContext);
  const location = useLocation();

  const loadAllComics = async ()=>{
    var response = await api.getUserById(location.pathname.split("/").at(-1));
    const comicid = response.data.user.favoredComics;
    var comicarr = [];
    for(var i = 0;i<comicid.length;i++){
      response = await api.getPublishedComicByID(comicid[i]);
        if(response.data.success){
            comicarr.push(response.data.comic);
        }
    }
    setComics(comicarr);
  };

  useEffect(()=>{
    loadAllComics();
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>Favorited Comics:</b>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,350px))",
          justifyContent: "center",
        }}
      >
        {comics.map((comic, index)=>{
          
          return(<ComicCard key={index} comic={comic}></ComicCard>);
        })}

       
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><Pagination count={10} color="primary" /></div>
    </div>
  );
};

export default HisFavoriteComic;