import api from "../api";
import AuthContext from '../auth';
import {useState, useEffect, useContext, createContext} from "react"
import commentSend from "../Images/commentSend.png";
import CommentGroup from './CommentGroup'
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DetailPageContext = createContext();

// props = {isComic, comicOrStoryID}
const CommentSession = (props) => {

    const ctx = useContext(AuthContext);

    // context States that are exported
    const [isComic, setIsComic] = useState(false);
    const [comicOrStoryID, setComicOrStoryID] = useState(null);
    const [userIDUsernamePictureMap, setUserIDUsernamePictureMap] = useState(new Map());
    // userIDUsernamePictureMap.set("6265d45")
    

    // states
    const [totalFirstLayerComments, setTotalFirstLayerComments] = useState(0)
    const [firstLayerComments, setFirstLayerComments] = useState([])
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [commentText, setCommentText] = useState("")
    const [replyToUserID, setReplyToUserID] = useState(null)
    const [replyToUsername, setReplyToUsername] = useState(null)
    const [replyToCommentID, setReplyToCommentID] = useState(null)
    const [updateTrigger, setUpdateTrigger] = useState(false);
    
        

    // context values
    const value = {isComic, comicOrStoryID, userIDUsernamePictureMap, setUserIDUsernamePictureMap, firstLayerComments, setFirstLayerComments, totalFirstLayerComments, setTotalFirstLayerComments, setReplyToUserID, setReplyToUsername, setReplyToCommentID};

    const commentTextUpdate = async (event) => {
        setCommentText(event.target.value);
    }

    const sendComment = async () => {
        if (commentText == "") {
            // alert(JSON.stringify(userIDUsernamePictureMap))
            alert(JSON.stringify([...userIDUsernamePictureMap.entries()]))
            return
        }
        let payload = {
            isComic: props.isComic,
            comicOrStoryID: props.comicOrStoryID,
            isReplyToAnotherComment: replyToCommentID != null,
            replyToCommentID: replyToCommentID,
            replyToUserID: replyToUserID,
            creatorID: ctx.auth.user._id,
            content: commentText,

        }
        // alert(JSON.stringify(payload))
        let response = await api.createComment(payload);
        if (response.status !== 200) {
            alert("Create Comment Failed")
        }
        else {
            setReplyToUserID(null)
            setReplyToUsername(null)
            setReplyToCommentID(null)
            setCommentText("");
            setUpdateTrigger(!updateTrigger)
            alert("Create Comment Successed")
        }
        
        
    }

    const getMoreComments = async () => {
        let payload = {
            isComic: props.isComic,
            comicOrStoryID: props.comicOrStoryID,
            isReplyToAnotherComment: false,
            replyToCommentID: null,
            skip: skip,
            limit: limit
        }
        const response = await api.getComments(props.comicOrStoryID, payload);
        //                         getComments(isComic, comicOrStoryID, isReplyToAnotherComment, skip, limit)
        // const response = await api.getComments(props.isComic, props.comicOrStoryID, false, null, skip, limit);

        // update firstLayerComments list, maximum comments in this list, and number of skips
        if (response.status !== 200) {
            alert("Loading First Layer Comments Failed");
        }
        else {
            setFirstLayerComments([...firstLayerComments, ...response.data.comments])
            setTotalFirstLayerComments(response.data.totalCount)
            setSkip(skip + response.data.comments.length)
        }
    }

    useEffect(()=> {
        // set context states 
        setIsComic(props.isComic);
        setComicOrStoryID(props.comicOrStoryID);
        // get replies
        getMoreComments();
    }, []);

    useEffect(() => {
        if (updateTrigger == true) {
            window.location.reload(false);
        }
            
    }, [updateTrigger])

    return(
        <> 
            <div style={{fontFamily: 'Ribeye Marrow', fontSize: 36}}>Comment</div>
            <DetailPageContext.Provider value={value}>
                {/* <div style={{width: "80%"}}> */}
                <div style={{width: "80%", position:"relative"}}>
                    { replyToUsername ?
                        <Button 
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{"text-transform": "none"}}
                        onClick={()=>{
                            setReplyToUsername(null);
                            setReplyToCommentID(null);
                            setReplyToUserID(null);
                        }}
                        >{replyToUsername}</Button>
                        :
                        <br></br>
                    }
                    
                    <div>
                        <TextField
                            multiline
                            fullWidth
                            minRows={4}
                            maxRows={4}
                            value = {commentText}
                            onChange ={(event)=>{commentTextUpdate(event);}}
                        />
                    </div>
                    <div
                        style={{
                            height:"50px", 
                            width:"80px", 
                            position:"absolute",  
                            // bottom:"-60px", 
                            right:"-60px",
                            bottom:"0px", 
                            // right:"0px",
                            backgroundImage: `url(${commentSend})`, 
                            backgroundPosition: 'right', 
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            cursor:"pointer"
                        }} 
                        onClick={sendComment}>    
                    </div>
                    {/* <Button /> */}
                </div>

{/* <div style={{display: "flex", width:"100%",flexDirection: "column", alignItems: "center", background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
    <div style={commentTitle}>Comment</div>
    <div style={{height:"300px", width:"100%", background : "white", position:"relative"}}><div style={commendSentStyle} onClick={addComment}></div></div>
</div>

<div style={{display: "flex",width:"100%" ,justifyContent:"center" ,background: "rgba(187,241,253,255)", padding: "5rem 3rem 5rem 3rem"}}>
    {commentList}
</div> */}
                <div style={{alignItems: "left"}}>
                    {
                        // firstLayerComments.length > 0 ?
                        firstLayerComments.map((firstLayerComment, index)=>{
                            
                            return(<CommentGroup key={'CommentGroup #' + index} firstLayerComment={firstLayerComment}/>)
                        })
                        // :
                        // <br></br>
                    }

                    {(totalFirstLayerComments != 0 && totalFirstLayerComments != firstLayerComments.length) ?
                        <div>
                            <p onClick={getMoreComments}>More {totalFirstLayerComments - skip} Comments...</p>
                        </div>
                        : 
                        <br></br>
                    }
                </div>
            </DetailPageContext.Provider>
            
        </>
    );
}

export default CommentSession;
export {DetailPageContext}