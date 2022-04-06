import { Fragment } from "react";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
    const navigate = useNavigate();

    return (<div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw", height: "100vh" }}>
        <button style={{ width: "500px", height: "500px", background: "" }} onClick={() => { navigate("/dashboard/comic/home"); }}>
            Comic App
        </button>
        <button style={{ width: "500px", height: "500px" }} onClick={() => { navigate("/dashboard/story/home"); }}>
            Story App
        </button>
    </div>);
};

export default DashboardPage;
