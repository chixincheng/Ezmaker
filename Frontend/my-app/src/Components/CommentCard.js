import api from "../api";
import AuthContext from '../auth';
import {DetailPageContext} from './CommentSession'
import {useState, useEffect, useContext} from "react"
import {unmountComponentAtNode} from "react-dom"

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

// props = {key, comment}
const CommentCard = (props) => {

    // data from props
    const {key, isFirstLayer,firstLayerComment, comment, replies, setReplies, totalReplies, setTotalReplies} = props;

    // data from contexts
    const ctx = useContext(AuthContext);
    const {isComic, comicOrStoryID, userIDUsernamePictureMap, setUserIDUsernamePictureMap, firstLayerComments, setFirstLayerComments, totalFirstLayerComments, setTotalFirstLayerComments, setReplyToUserID, setReplyToUsername, setReplyToCommentID} = useContext(DetailPageContext);

    // states
    const [userName, setUserName] = useState();
    const [profilePic, setProfilePic] = useState();
    const [getFailed, setGetFailed] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    

    const replyOnClick = () => {
        setReplyToUserID(isFirstLayer? null : comment.creatorID)
        setReplyToUsername("@" + userName)
        setReplyToCommentID(isFirstLayer? comment._id : firstLayerComment._id)
    }

    function deletePopUp(event){
        event.stopPropagation();
        setDeleteOpen(true);
    };

    function handleDeleteClose (event){
        event.stopPropagation();
        setDeleteOpen(false);
    };

    const deleteComment = async (event) => {
        event.preventDefault();
        const response = await api.deleteComment(comment._id, ctx.auth.user._id);
        if(response.status !== 200){
            alert("Deletion Failed!");
        }
        else{
            alert("Delete Comment Successed!")
        }
        // unmountComponentAtNode(document.getElementById(key));
        if (isFirstLayer) {
            setTotalReplies(0)
            setReplies([])
            setTotalFirstLayerComments(totalFirstLayerComments - 1)
            setFirstLayerComments(firstLayerComments.filter(firstLayerComment => firstLayerComment._id !== comment._id))
        }
        else {
            setTotalReplies(totalReplies - 1)
            setReplies(replies.filter(reply => reply._id !== comment._id))
        }
        setDeleteOpen(false);
        
    }

    const userIconAndNameOnClick = () => {
        alert(`${comment._id} On Click: \nuserID: ${comment.creatorID} \nuserName: ${userName}`)
    }

    const getUsernameAndPicture = async () => {
        if (userIDUsernamePictureMap.get(comment.creatorID) == null) {
            let id = comment.creatorID;
            const userResponse = await api.getUsernameAndProfilePicByID(id);
            if (userResponse.status != 200) {
                setGetFailed(true);
                alert(`Loading userName and profilePicture of userID=${comment.creatorID} failed`);
            }
            else {
                setUserName(userResponse.data.userName);
                setProfilePic(userResponse.data.profilePicture);
                let entries = [
                    ...userIDUsernamePictureMap.entries(),
                    [
                        id,
                        [userResponse.data.userName, userResponse.data.profilePicture]
                    ]
                ]
                setUserIDUsernamePictureMap(new Map(entries));
            }
        }
        else {
            setUserName(userIDUsernamePictureMap.get(comment.creatorID)[0])
            setProfilePic(userIDUsernamePictureMap.get(comment.creatorID)[1])
        }
        
    }

    useEffect(()=> {
        getUsernameAndPicture();
    }, [])

    

    return (
        <>
        {comment ?
            <div style={{display:"flex"}}>
                <div onClick={userIconAndNameOnClick} style={{ cursor:"pointer" ,width:"50px", height:"50px" , borderRadius:"50%" ,backgroundImage: `url(${profilePic})`, backgroundPosition: 'center', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', marginRight:"1rem"}}>
                </div>
                <div>
                    <p style={{cursor:"pointer"}} onClick={userIconAndNameOnClick}><u>{userName}</u></p>
                    { comment.replyToUserID ?
                        <p style={{fontSize:"18px"}}><i>{userIDUsernamePictureMap.get(comment.replyToUserID)? ("@"+userIDUsernamePictureMap.get(comment.replyToUserID)[0]+":"): ""} {comment.content}</i></p>
                        :
                        <p style={{fontSize:"18px"}}><i>{comment.content}</i></p>
                    }
                    <div style={{display:"flex"}}>
                    <p style={{marginRight:"1rem"}}>{new Date(comment.createdAt).toLocaleString()}</p>
                    <p style={{color:"blue", marginRight:"1rem", cursor:"pointer"}} onClick={replyOnClick}>Reply</p>
                    {(ctx.auth.user._id == comment.creatorID) ?
                        
                        <p style={{color:"red", cursor:"pointer"}} onClick={deletePopUp}>Delete</p>
                        :
                        <p></p>
                    }
                    </div>
                   
                    
                </div>

            </div>
        :
        <br></br>
        }
        <Dialog
            id = "delete-comment"
            maxWidth='sm'
            open= {deleteOpen}
            onClose={(event)=>{handleDeleteClose(event);}}
        >
        <DialogTitle>
          Delete "{comment.content}" ?
          <DialogActions>
              <Button onClick={(event)=>{deleteComment(event);}}>Confirm</Button>
              <Button onClick={(event)=>{handleDeleteClose(event);}}>Cancel</Button>
          </DialogActions>
        </DialogTitle>
      </Dialog>
        </>
        
    );
}

export default CommentCard;