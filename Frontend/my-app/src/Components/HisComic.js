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



const HisComic = ({itemsPerPage}) => {
  const rTLDrawApp =   new TldrawApp() ;
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(5);
  const [comics, setComics] = useState([]);
  const ctx = useContext(AuthContext);
  const location = useLocation();
  const [ myPage , setMyPage] = useState(1);
  const setPage = (e, p) => {
    setMyPage(p);
  }
  const loadAllComics = async ()=>{
    const response2 = await api.getAllUserPublishedComics(location.pathname.split("/").at(-1));
    setComics(response2.data.publishedComics);
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>Comics:</b>
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

export default HisComic;