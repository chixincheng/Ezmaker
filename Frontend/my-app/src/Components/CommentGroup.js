import api from "../api";
import AuthContext from '../auth';
import {useState, useEffect, useContext} from "react"
import CommentCard from './CommentCard'
import {DetailPageContext} from './CommentSession'

// props = {key, firstLayerComment}
const CommentGroup = (props) => {

    // data from props
    const {key, firstLayerComment} = props;

    // data from DetailPageContext
    const {isComic, comicOrStoryID, userIDUsernamePictureMap, setUserIDUsernamePictureMap, firstLayerComments, setFirstLayerComments, totalFirstLayerComments, setTotalFirstLayerComments, setReplyToUserID, setReplyToUsername, setReplyToCommentID} = useContext(DetailPageContext);

    // states
    const [repliedComments, setRepliedComments] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(2);
    const maxLimit = 10;
    const [totalReplies, setTotalReplies] = useState(0)


    const getMoreReplies = async () => {
        let payload = {
            isComic: isComic,
            comicOrStoryID: comicOrStoryID,
            isReplyToAnotherComment: true,
            replyToCommentID: firstLayerComment._id,
            skip: skip,
            limit: limit
        }
        const response = await api.getComments(firstLayerComment._id,payload);
        //                         getComments(isComic, comicOrStoryID, isReplyToAnotherComment, replyToCommentID, skip, limit)
        // const response = await api.getComments(isComic, comicOrStoryID, true, firstLayerComment._id, skip, limit);
        if (response.status !== 200) {
            alert("Loading Replied Comments Failed");
        }
        else {
            setTotalReplies(response.data.totalCount);
            setSkip(skip + response.data.comments.length);
            setLimit(limit == 2 ? maxLimit - limit : maxLimit);
            setRepliedComments([...repliedComments, ...response.data.comments]);
            console.log(response.data.comments)
        }
    }

    useEffect(()=> {
        getMoreReplies();
    }, [])

    return(
        <>
            {(firstLayerComment !== undefined) ?
                <CommentCard key={"firstLayerComment #" + key} isFirstLayer={true} firstLayerComment={firstLayerComment} comment={firstLayerComment} replies={repliedComments} setReplies={setRepliedComments} totalReplies={totalReplies} setTotalReplies={setTotalReplies}/>
                :
                <br></br>
            }
            
            {
                repliedComments.map((repliedComment, index) => {
                    return (
                        <div style={{"padding-left":"100px"}}>
                            <CommentCard key={firstLayerComment._id + " reply #" + index} isFirstLayer={false} firstLayerComment={firstLayerComment} comment={repliedComment} replies={repliedComments} setReplies={setRepliedComments} totalReplies={totalReplies} setTotalReplies={setTotalReplies}/>
                        </div>
                    );
                    
                })
            }
            {(totalReplies != 0 && totalReplies != repliedComments.length) ?
                <div style={{"padding-left":"100px"}}>
                    <p onClick={getMoreReplies}>More {totalReplies - skip} Replies...</p>
                </div>
                :
                <br></br>
            }
            
        </>
    );
}


export default CommentGroup;