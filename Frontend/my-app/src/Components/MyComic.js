import ComicCard from "./ComicCard";
import { Fragment } from "react";

const MyComic = () => {
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
        <button>Add</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px,500px))",
          justifyContent: "center"
        }}
      >
        <ComicCard></ComicCard>
        <ComicCard></ComicCard>
        <ComicCard></ComicCard>
        <ComicCard></ComicCard>
        <ComicCard></ComicCard>
        <ComicCard></ComicCard>
      </div>
    </div>
  );
};

export default MyComic;
