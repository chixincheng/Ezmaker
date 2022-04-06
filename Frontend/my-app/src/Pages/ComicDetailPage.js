import Header from "../Components/Header";
import addFav from "../Images/addFav.png";
import removeFav from "../Images/removeFav.png";
import download from "../Images/download.png";
import Pagination from '@mui/material/Pagination';
import rightimage from "../Images/comicsDetailSample.png";
import leftimage from "../Images/comicsDetailSample2.png";
import { fontSize } from "@mui/material/node_modules/@mui/system";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';


var addFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(80vw - 40px)', backgroundImage: `url(${addFav})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    cursor:"pointer"
   };
var removeFavButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(85vw - 30px)', backgroundImage: `url(${removeFav})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var downloadButtonStyle = {height:"50px", width:"80px", position:"absolute", top:"calc(20vh - 50px)",left: 'calc(90vw - 20px)', backgroundImage: `url(${download})`,
   backgroundPosition: 'right',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   cursor:"pointer"
  };
var textStyle = {
    fontFamily: 'Love Ya Like A Sister',
    fontSize: 36
};
var images1 = { height:"800px", width:"1000px",  backgroundImage: `url(${leftimage})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
};
var images2 = { height:"800px", width:"1000px", backgroundImage: `url(${rightimage})`,
    backgroundPosition: 'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
};
const addFavorite = ()=>{
    ;
};
const removeFavorite = ()=>{
    ;
};
const downloadComic = () => {
    ;
}

const ComicDetailPage = () => {
    return(
        <div >
            <Header></Header>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
                <div style={addFavButtonStyle} onClick={addFavorite}></div>
                <div style={removeFavButtonStyle} onClick={removeFavorite}></div>
                <div style={downloadButtonStyle} onClick={downloadComic}></div>
                <div style={textStyle}>Naruto</div>
                <div style={textStyle}>By Masashi Kishimoto</div>
            </div>
            <div style={{background: "rgba(250, 241, 194, 1)", padding: "5rem 3rem 5rem 3rem", display: "flex"}}>
                <div style={images1}></div>
                <div style={images2}></div>
            </div>
            <Pagination count={10} color="primary"/>
            <div style={{background: "rgba(187,241,253,255)"}}>

            </div>
        </div>
    );
};   

export default ComicDetailPage;