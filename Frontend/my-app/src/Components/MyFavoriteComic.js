import ComicCard from "./ComicCard";
import React, { useEffect, useState, useContext} from 'react';
// require('dotenv').config();
import Pagination from '@mui/material/Pagination';
import api from "../api";
import AuthContext from "../auth";


const MyFavoriteComic = ({itemsPerPage}) => {
  const [comics, setComics] = useState([]);
  const ctx = useContext(AuthContext);
  const [ myPage , setMyPage] = useState(1);
  const setPage = (e, p) => {
    setMyPage(p);
  }
  const loadAllComics = async ()=>{
    var response = await api.getUserById(ctx.auth.user._id);
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
        <b style={{fontFamily: "Ribeye Marrow", fontSize: 20}}>My Favorite Comics:</b>
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

export default MyFavoriteComic;