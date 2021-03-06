import api from "../api";
import AuthContext from '../auth';
import {Fragment, useState, useEffect, useContext, useParams} from "react"
import { useNavigate, useLocation, Navigate} from "react-router-dom";
import Header from "../Components/Header";
import images from "../Images";
import PlaylistComponent from "../Components/PlaylistComponent.js"
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from "@mui/material";


const PlaylistPage = (props) => {

    const ctx = useContext(AuthContext);

    // get navigate parameters: isComic and userID
    const navigate = useNavigate();
    const location = useLocation(); // location.isComic
    const pathNames = location.pathname.split("/");
    const isComic = pathNames[1] == 'comic';
    const userID = pathNames.at(-1);        // owner of current playlists view
    const userIsCreator = ctx.auth.user._id == userID;

    const [allPublished, setAllPublished] = useState(); // all a user's published comics/stories: {id: {title, coverPage, createAt}}
    const [allPlaylists, setAllPlaylists] = useState(new Map()); // {id: {title, elementIDSeries}}
    const [newID, setNewID] = useState(1);
    const [playlistsArray, setPlaylistsArray] = useState([]); // [id]
    const [status, setStatus] = useState(new Map());  // {id: 0/1/2}   0: saved, 1: new, 2: editing
    const [selectedID, setSelectedID] = useState(null); // selected playlistID
    const [unaddedToPlaylist, setUnaddedToPlaylist] = useState(null) // {elementIDSeries}
    

    const [deleteOpen, setDeleteOpen] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [renderFlag, setRenderFlag] = useState(false);

    const handleTitleUpdate = (event)=>{
        if (!userIsCreator) {
            return;
        }
        event.stopPropagation();
        console.log(allPlaylists[selectedID]);
        allPlaylists[selectedID].title = event.target.value
        console.log(selectedID.length > 8);
        
        if(selectedID.length > 8){
            status[selectedID] = 2;
        }
        else{
            status[selectedID] = 1;
        }
        
        setRenderFlag(!renderFlag)
    }

    const playlistOnClick = (playlistID) => {
        if (!userIsCreator) {
            return;
        }
        if (selectedID == playlistID) {
            setSelectedID(null);
            setUnaddedToPlaylist(null);
        }
        else {
            setSelectedID(playlistID);

            // set all unused published and sort them based on created Time(oldest to newest)
            var unusedPublished = new Set();
            for (let [key, value] of Object.entries(allPublished)) {
                unusedPublished.add(key);
            }
            for(let publishedID of allPlaylists[playlistID].elementIDSeries) {
                unusedPublished.delete(publishedID);
            }
            unusedPublished = [...unusedPublished]
            unusedPublished.sort((a, b) => allPublished[a].createdAt > allPublished[b].createdAt ? 1 : -1);
            setUnaddedToPlaylist(unusedPublished);
        }
    }

    const delistPublished = (event, playlistID, publishedID) => {
        if (!userIsCreator) {
            event.preventDefault();
            if( isComic ){
                navigate(`/comic/detail/${playlistID}`);
                const response = api.incComicView(playlistID,{comicID: playlistID});
            }
            else {
                navigate(`/story/detail/${playlistID}`);
                const response = api.incStoryView(playlistID,{storyID: playlistID});
            }
            return;
        }
        event.stopPropagation();
        if (playlistID == selectedID) {
            if (status[playlistID] == 0) {
                status[playlistID] = 2;
            }
            allPlaylists[playlistID].elementIDSeries = [...allPlaylists[playlistID].elementIDSeries.filter((id) => {return id != publishedID})]
            setUnaddedToPlaylist([...unaddedToPlaylist, publishedID])
        }
    }
    
    const addlistPublished = (event, playlistID, publishedID) => {
        if (!userIsCreator) {
            return;
        }
        event.stopPropagation();
        if (playlistID == selectedID) {
            if (status[playlistID] == 0) {
                status[playlistID] = 2;
            }
            allPlaylists[playlistID].elementIDSeries.push(publishedID)
            setUnaddedToPlaylist([...unaddedToPlaylist.filter((id) => {return id != publishedID})])
        }
    }


    const addPlaylistOnClick = () => {
        
        let playlistID = newID;
        allPlaylists[playlistID] = {title: "Default Playlist Title", elementIDSeries: []};
        status[playlistID] = 1;
        setPlaylistsArray([playlistID, ...playlistsArray])
        setSelectedID(playlistID);
        setNewID(newID + 1);

        var unusedPublished = []
        for (let [key, value] of Object.entries(allPublished)) {
            unusedPublished.push(key);
        }
        unusedPublished.sort((a, b) => allPublished[a].createdAt > allPublished[b].createdAt ? 1 : -1);
        setUnaddedToPlaylist(unusedPublished);
        
    }

    function deletePopUp(event){
        event.stopPropagation();
        setDeleteOpen(true);
    };

    function handleDeleteClose (event){
        event.stopPropagation();
        setDeleteOpen(false);
    };



    const deletePlaylist = async(event)=>{
        event.preventDefault();
        if (status[selectedID] == 1) {
            status.delete(selectedID);
            allPlaylists.delete(selectedID);
            setPlaylistsArray([...playlistsArray.filter((id) => {return id != selectedID})])
            setSelectedID(null);
            setUnaddedToPlaylist(null);
        }
        else {
            const response = await api.deletePlaylist(selectedID, ctx.auth.user._id);
            if(response.status !== 200){
                alert("delete failed");
            }
            else {
                status.delete(selectedID);
                allPlaylists.delete(selectedID);
                setPlaylistsArray([...playlistsArray.filter((id) => {return id != selectedID})])
                setSelectedID(null);
                setUnaddedToPlaylist(null);
                alert("delete successed");
            }
        }
        setDeleteOpen(false);
        
    }

    const save = async (event)=>{
        setLoading(true);
        event.preventDefault();
        let message = "";
        for (let [key, value] of Object.entries(status)) {
            console.log(value);
            // creating new playlist
            if (value == 1) {
                console.log(allPlaylists[key]);
                if (allPlaylists[key].elementIDSeries.length == 0) {
                    message = message + "\n\"" + allPlaylists[key].title + "\" must have at least one content!"
                }
                else if( allPlaylists[key].title.length < 1 ){
                    message = message + "\n\"" + "\" can not be empty title!"
                }
                else {
                    let payload = {
                        creatorID: userID,
                        isComic: isComic,
                        title: allPlaylists[key].title,
                        elementIDSeries: allPlaylists[key].elementIDSeries
                    }
                    let createResponse = await api.createPlaylist(payload);
                    if (createResponse.status != 200) {
                        message = message + "\n\"" + allPlaylists[key].title + "\" Created Unsuccessfully!"
                    }
                    else {
                        message = message + "\n\"" + allPlaylists[key].title + "\" Created Successfully!"
                        status[key] = 0;
                    }
                }
                
            }

            // update a playlist
            else if (value == 2) {
                if (allPlaylists[key].elementIDSeries.length == 0) {
                    message = message + "\n\"" + allPlaylists[key].title + "\" must have at least one content!"
                    // failures.push(key);
                }
                else if( allPlaylists[key].title.length < 1 ){
                    message = message + "\n\"" + "\" can not be empty title!"
                }
                else{
                    let payload = {
                        playlistID: key,
                        userID: userID,
                        title: allPlaylists[key].title,
                        elementIDSeries: allPlaylists[key].elementIDSeries
                    }
                    console.log(payload);
                    // alert(JSON.stringify(payload))
                    let updateResponse = await api.updatePlaylist(payload);
                    if (updateResponse.status != 200) {
                        message = message + "\n\"" + allPlaylists[key].title + "\" Updated Unsuccessfully!"
                        // failures.push(key)
                    }
                    else {
                        // successes.push(key);
                        message = message + "\n\"" + allPlaylists[key].title + "\" Updated Successfully!"
                        status[key] = 0;
                    }
                }
                
            }
        }
        alert(message == ""? "All Saved Successfully!" : message);
        setLoading(false);
        console.log(allPlaylists)
    }

    const setUpPlaylists = async () => {
        let payload = {
            creatorID: userID,
            isComic: isComic
        }
        let response = await api.getUserPlaylists(payload);
        if (response.status == 404) {
            alert("404")
        }
        let response2 = null;
        if (isComic) {
            response2 = await api.getAllUserPublishedComics(userID);
        }
        else {
            response2 = await api.getAllUserPublishedStories(userID);
        }

        // check and set the user's playlists from var response
        if (response.status != 200) {
            alert("get playlists of " + userID + " failed");
            return;
        }
        

        var playlistsArr = []
        var playlistsMap = new Map();
        var statusMap = new Map();
        for (const onePlaylist of [...response.data.playlists]) {
            playlistsArr.push(onePlaylist._id)
            playlistsMap[onePlaylist._id] = {title: onePlaylist.title, elementIDSeries:onePlaylist.elementIDSeries};
            statusMap[onePlaylist._id] = 0;
        }
        setAllPlaylists(playlistsMap);
        setPlaylistsArray(playlistsArr);
        setStatus(statusMap);

        // check and set the user's all published comics/stories from var response
        if (response.status != 200) {
            alert("get playlists of " + userID + " failed");
            return;
        }
        var publishes = isComic ? response2.data.publishedComics : response2.data.publishedStories;
        var publishedMap = new Map();
        
        for (const onePublish of publishes) { 
            publishedMap[onePublish._id] = {
                title: isComic ? onePublish.comicTitle : onePublish.storyTitle, 
                coverPage: onePublish.coverPage,
                createdAt: onePublish.createdAt
            }
            
        }
        setAllPublished(publishedMap);
        
    }

    useEffect(()=> {
        
        setUpPlaylists();
    }, [])

    return (
        <>
            {loading ? 
                <Fragment>
                    <div style={{opacity:"0.5",position:"fixed", zIndex:"50" ,width:"100vw", height:"100vh", background:"#F0F0F0"}}></div>
                    <div style={{ position:"fixed",zIndex:"100"  ,width:"100vw", height:"100vh", backgroundImage:`url(${images.loading})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain',backgroundPosition: 'center' }} > 
                    
                    </div>
                </Fragment>
                
                :
                <Fragment/>
            }
            <div  style={{background:"rgba(250, 241, 194, 1)", display:"flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}} >
                <Header></Header>
                <div style={{width:"100%"}}>
                    { userIsCreator ?
                        <div style={{display:"flex", justifyContent:"space-evenly", margin:"1rem 0 1rem 0", alignItems:"center"}}>
                            <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
                                <img
                                style={{
                                    width: "100px",
                                    height: "auto",
                                    cursor: "pointer",
                                
                                }}
                                onClick={addPlaylistOnClick}
                                src={images.addComic}
                                ></img>
                                <p>Add New</p>
                            </div>
                            
                            <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
                                <img
                                style={{
                                    width: "100px",
                                    height: "auto",
                                    cursor: "pointer",
                                
                                }}
                                onClick={(event)=>{save(event);}}
                                src={images.save}
                                ></img>
                                <p>Save All</p>
                            </div>

                            <div style={{display:"flex",flexDirection:"column", alignItems:"center",  marginRight: "2rem",}}>
                                <img
                                style={{
                                    width: "100px",
                                    height: "auto",
                                    cursor: "pointer",
                                }}
                                onClick={(event) => {
                                    if (selectedID != null) {
                                        deletePopUp(event)
                                    }
                                    else {
                                        alert("you must select a playlist before delete")
                                    }
                                }}
                                src={images.deleteIcon}
                                ></img>
                                <p>Delete</p>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    
                    
                    <div style={{width:"100%"}}>
                        {
                            playlistsArray.map((playlistID, index) => {
                                return (
                                    <>
                                        <div 
                                            // style={{"padding-left":"100px"}} 
                                            style={{'border': selectedID==playlistID ? '5px solid red' : '0', padding:"1rem",background: "rgba(187, 241, 253, 1)", margin:"1rem",
                                                    borderRadius:"1rem", maxWidth:"100%", minWidth:"95%"
                                            }}
                                            onClick={
                                                (event) => {
                                                    playlistOnClick(playlistID);
                                                }
                                            }
                                        >
                                            
                                            <div>
                                                { userIsCreator ?
                                                    <>
                                                        <TextField 
                                                        // label="Comic Title"
                                                        style={{border:"3px black solid", borderRadius:"1rem"}}
                                                            value = {allPlaylists[playlistID].title}
                                                            onChange ={(event)=>{handleTitleUpdate(event);}}
                                                            onClick={(event) => {
                                                                if (selectedID ==playlistID) {
                                                                    event.stopPropagation();
                                                                }
                                                                
                                                            }}
                                                            >
                                                        </TextField>
                                                        <p style={{fontSize:"1.5rem" ,color:  status[playlistID] == 0 ? "green":( "orange") }}><b>{status[playlistID] == 0 ? "Saved" :( "Editing")}</b></p>
                                                    </>
                                                    :
                                                    <>
                                                        <p>{allPlaylists[playlistID].title}</p>
                                                    </>
                                                }
                                                
                                                
                                                <p><b>In Playlist:</b></p>
                                                <ul style={{'list-style-type': 'none', display:"flex", overflow:"auto", maxWidth:"100%", background:"white", padding:"1rem", borderRadius:"1rem"}}>
                                                    {   allPublished ?
                                                        
                                                        allPlaylists[playlistID].elementIDSeries.map((addedPublish, index) => {
                                                            return (
                                                                <li style={{border:"3px black solid", marginRight:"1rem"}}>
                                                                    <div  style={{padding:"1rem",display:"flex", flexDirection:"column", alignItems:"center"}} onClick={(event) => {delistPublished(event, playlistID, addedPublish)}}>
                                                                        <img 
                                                                            src={allPublished[addedPublish]['coverPage'] != null ?   allPublished[addedPublish].coverPage: "https://res.cloudinary.com/daufq6nuh/image/upload/c_scale,h_5000,w_3500/v1650580213/Ezmaker/WeChat_Image_20220421182906_etv2nu.png"}
                                                                            style={{width:"100px", height:"auto"}}
                                                                        ></img>
                                                                        <p style={{display:"flex", justifyContent:"center"}}><u>{allPublished[addedPublish].title}</u></p>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                        :
                                                        <></>
                                                    }
                                                </ul>
                                            </div>
                                            
                                        

                                        {   selectedID == playlistID ?
                                            <div>
                                            <p><b>Available {isComic? "Comics" : "Stories"}:</b></p>
                                            <ul style={{'list-style-type': 'none',display:"flex", overflow:"auto", background:"white", padding:"1rem", borderRadius:"1rem"}}>
                                            
                                            {
                                                unaddedToPlaylist.map((unusedPublished, index) => {
                                                    return (
                                                        <li style={{border:"3px black solid", marginRight:"1rem"}}>
                                                            <div style={{padding:"1rem" , display:"flex", flexDirection:"column", alignItems:"center"}}  onClick={(event) => {addlistPublished(event, playlistID, unusedPublished)}}>
                                                                <img 
                                                                    src={allPublished[unusedPublished]['coverPage'] != null ?   allPublished[unusedPublished].coverPage: "https://res.cloudinary.com/daufq6nuh/image/upload/c_scale,h_5000,w_3500/v1650580213/Ezmaker/WeChat_Image_20220421182906_etv2nu.png"}
                                                                    style={{width:"100px", height:"auto"}}
                                                                ></img>
                                                                <p style={{display:"flex", justifyContent:"center"}}><u>{allPublished[unusedPublished].title}</u></p>
                                                            </div>
                                                            
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                            </div>
                                            :
                                            <></>
                                        }
                                        </div>
                                    </>
                                );
                                
                            })
                        }
                        
                    </div>

                </div>
            </div>
            <Dialog
                id = "delete-modal"
                maxWidth='sm'
                open= {deleteOpen}
                onClose={(event)=>{handleDeleteClose(event);}}
                >
                <DialogTitle>
                {/* Delete "{selectedID != null? allPlaylists.get(selectedID)['title'] : ""}" ? */}
                Delete "{selectedID != null? allPlaylists[selectedID].title : ""}" ?
                <DialogActions>
                    <Button onClick={(event)=>{deletePlaylist(event);}}>Confirm</Button>
                    <Button onClick={(event)=>{handleDeleteClose(event);}}>Cancel</Button>
                </DialogActions>
                </DialogTitle>
            </Dialog>
        </>
    );
}

export default PlaylistPage;