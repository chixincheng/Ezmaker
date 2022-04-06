
import ComicCard from "./ComicCard";
import { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import images from "../Images/index.js";
import Pagination from '@mui/material/Pagination';



const Items = ({ comics }) => {
  return <>{comics && comics.map((comic, index) => {
      return(<ComicCard comic={comic} ></ComicCard>);
  })}</>;
};



const MyComic = ({itemsPerPage}) => {
  // const items = null;
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(5);
  // const [itemOffset, setItemOffset] = useState(0);

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(items.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(items.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage]);

  
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // setItemOffset(newOffset);
  };

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
        <b>My Comics:</b>
        <img style={{width:"100px", height:"auto", cursor:"pointer"}} onClick={()=>{alert(123);}} src={images.addComic}></img>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,500px))",
          justifyContent: "center",
        }}
      >
        {/* <Items comics={currentItems}></Items> */}
        {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}
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
