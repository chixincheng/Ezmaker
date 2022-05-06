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
                            style={{background:"white", marginBottom:"3rem"}}
                        />
                    </div>
                    <div
                        style={{
                            height:"50px", 
                            width:"80px", 
                            position:"absolute",  
                            right:"-60px",
                            bottom:"0px", 
                            backgroundImage: `url(${commentSend})`, 
                            backgroundPosition: 'right', 
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            cursor:"pointer"
                        }} 
                        onClick={sendComment}>    
                    </div>
                </div>

                <div style={{alignItems: "left"}}>
                    {
                        firstLayerComments.map((firstLayerComment, index)=>{
                            
                            return(<CommentGroup key={'CommentGroup #' + index} firstLayerComment={firstLayerComment}/>)
                        })
                    }

                    {(totalFirstLayerComments != 0 && totalFirstLayerComments != firstLayerComments.length) ?
                        <div>
                            <p  style={{cursor:"pointer"}} onClick={getMoreComments}>More {totalFirstLayerComments - skip} Comments...</p>
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