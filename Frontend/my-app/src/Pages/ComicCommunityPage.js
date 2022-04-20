import ComicCard from "../Components/ComicCard";
import Pagination from '@mui/material/Pagination';
import Header from "../Components/Header";
import { Fragment } from "react";
import images from "../Images";
import SortButton from "../Components/SortButton";
import React, { useEffect, useState, useContext } from 'react';
import api from "../api";

const ComicCommunityPage = ()=>{

  const [comics, setComics] = useState([]);

  const loadAllComics = async ()=>{
    const response2 = await api.getCommunityComics();
    console.log(response2);
    var array = [...response2.data.comics]
    setComics(array);
  };
  
  useEffect(()=>{
    loadAllComics();
  },[]);

    return(<Fragment>
      <Header></Header>
      <SortButton></SortButton>
      <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(100px,500px))",
            justifyContent: "center",
          }}
        >
          {comics.map((comic, index)=>{
          
          return(<ComicCard key={index} comic={comic}></ComicCard>);
        })}
        </div>
        <div style={{display:"flex",justifyContent:"center"}}><Pagination count={10} color="primary" /></div>
      </div>
    </Fragment>);
};

export default ComicCommunityPage;