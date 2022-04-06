import ComicCard from "../Components/ComicCard";
import Pagination from '@mui/material/Pagination';
import Header from "../Components/Header";
import { Fragment } from "react";
import images from "../Images";

const ComicCommunityPage = ()=>{

    return(<Fragment>
      <Header></Header>
      <div style={{ padding: "5rem 3rem 5rem 3rem", background: "rgba(250, 241, 194, 1)", height:`clac(100vh -  )` }}>
        
      
    
     

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(100px,500px))",
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
    </Fragment>);
};

export default ComicCommunityPage;