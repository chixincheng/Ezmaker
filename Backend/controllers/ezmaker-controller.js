const Comic = require('../models/comic-model');
const Story = require('../models/story-model');
const Comment = require('../models/comment-model');
const User = require('../models/user-model')
const PublishedComic = require('../models/publishedComic-model');
const PublishedStory = require('../models/publishedStory-model');
const {cloudinary} = require("../cloudinary");
const { findOneAndUpdate } = require('../models/comic-model');


function resError (res,errCode, err) {
    return res.status(errCode).json({
        success: false,
        message: err
    })
}

// get community comics
getCommunityComics = async (req, res) => {
    await PublishedComic.find({}, (err, publishedComicList) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!publishedComicList.length) {
            return resError(res,404, 'Published comic list not found')
        }
        return res.status(200).json({ success: true, data: publishedComicList })
    }).catch(err => console.log(err))
}

// get community stories
getCommunityStories = async (req, res) => {
    await PublishedStory.find({}, (err, publishedStoryList) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!publishedStoryList.length) {
            return resError(res,404, 'Published story list not found')
        }
        return res.status(200).json({ success: true, data: publishedStoryList })
    }).catch(err => console.log(err))
}

//create comics
createComic = (req, res) => {
    console.log(req.files);
    const body = req.query;
    if (!body) {
        return resError(res,400, 'You must provide a comic object')
    }

    const comic = new Comic(body);
    
    if (!comic) {
        return resError(res,400, 'Comic Object Creation Failed in JavaScript')
    }

    comic
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                comic: comic,
                message: 'Comic Created!'
            })
        })
        .catch(error => {
            return resError(res,400, 'Comic Not Created!')
        })
}

//edit comics
editComic = async (req, res) => {
    const body = req.query
    console.log("updateComic: " + JSON.stringify(body));
    if (!body || !body.id) {
        return resError(res,400, 'You must provide a body to update')
    }

    await Comic.findOne({ _id: req.query.id }, (err, comic) => {
        console.log("comic found: " + JSON.stringify(comic));
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'Comic not found!')
        }

        comic.comicTitle = body.comicTitle

        comic
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: comic._id,
                    message: 'Comic updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return resError(res,400, 'Comic not updated!')
            })
    })
}

//delete the comic by id 
deleteComic = async (req, res) => {
    await Comic.findById({ _id: req.query.id }, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'Comic not found!')
        }
        Comic.findOneAndDelete({ _id: req.query.id }, () => {
            return res.status(200).json({ success: true, data: comic })
        }).catch(err => console.log(err))
    })
}


//create stories
createStory = (req, res) => {
    const body = req.query;
    if (!body) {
        return resError(res,400, 'You must provide a story object')
    }

    const story = new Story(body);
    console.log("creating story: " + JSON.stringify(story));
    if (!story) {
        return resError(res,400, 'Story Object Creation Failed in JavaScript')
    }

    story
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                story: story,
                message: 'Story Created!'
            })
        })
        .catch(error => {
            return resError(res,400, 'Story Not Created!')
        })
}

//edit stories
editStory = async (req, res) => {
    const body = req.query
    console.log("updateStory: " + JSON.stringify(body));
    if (!body || !body.id) {
        return resError(res,400, 'You must provide a body to update')
    }

    Story.findOne({ _id: req.query.id }, (err, story) => {
        console.log("Story found: " + JSON.stringify(story));
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }

        story.storyTitle = body.storyTitle

        story
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: story._id,
                    message: 'Story updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return resError(res,400, 'Story not updated!')
            })
    })
}

//delete the story by id 
deleteStory = async (req, res) => {
    await Story.findById({ _id: req.query.id }, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }
        Story.findOneAndDelete({ _id: req.query.id }, () => {
            return res.status(200).json({ success: true, data: story })
        }).catch(err => console.log(err))
    })
}

// get comic by id
getComicByID = async (req, res) => {
    await Comic.findById({ _id: req.query.id }, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'Comic not found!')
        }
        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}

// get story by id
getStoryByID = async (req, res) => {
    await Story.findById({ _id: req.query.id }, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}

// get all user's unpublished comics
getAllUserUnpublishedComics = async (req, res) => {
    await Comic.find({ }, (err, comicLists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comicLists) {
            return resError(res,404, 'Comic not found')
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in comicLists) {
                let comic = comicLists[key];
                if(comic.authorID.equals(req.query._id)){
                    let pair = {
                        _id: comic._id,
                        authorID: comic.authorID,
                        authorName: comic.authorName,
                        editedTime: comic.editedTime,
                        comicTitle: comic.comicTitle
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// get all user's unpublished stories
getAllUserUnpublishedStories = async (req, res) => {
    await Story.find({ }, (err, storyLists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!storyLists) {
            return resError(res,404, 'Story not found')
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in storyLists) {
                let story = storyLists[key];
                if(story.authorID.equals(req.query._id)){
                    let pair = {
                        _id: story._id,
                        authorID: story.authorID,
                        authorName: story.authorName,
                        editedTime: story.editedTime,
                        storyTitle: story.storyTitle
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// get all user's published comics
getAllUserPublishedComics = async (req, res) => {
    await PublishedComic.find({ }, (err, comicLists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comicLists) {
            return resError(res,404, 'Published comic not found')
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in comicLists) {
                let comic = comicLists[key];
                if(comic.authorID.equals(req.query._id)){
                    let pair = {
                        _id: comic._id,
                        authorID: comic.authorID,
                        authorName: comic.authorName,
                        comicTitle: comic.comicTitle,
                        comments: comic.comments,
                        dislikedUser: comic.dislikedUser,
                        likedUser: comic.likedUser,
                        publishedTime: comic.publishedTime,
                        viewNumber: comic.viewNumber
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// get all user's published stories
getAllUserPublishedStories = async (req, res) => {
    await PublishedStory.find({ }, (err, storyLists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!storyLists) {
            return resError(res,404, 'Story not found')
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in storyLists) {
                let story = storyLists[key];
                if(story.authorID.equals(req.query._id)){
                    let pair = {
                        _id: story._id,
                        authorID: story.authorID,
                        authorName: story.authorName,
                        storyTitle: story.storyTitle,
                        comments: story.comments,
                        dislikedUser: story.dislikedUser,
                        likedUser: story.likedUser,
                        publishedTime: story.publishedTime,
                        viewNumber: story.viewNumber
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// create a new comment
createComment = (req,res) =>{
    const body = req.query;
    if (!body) {
        return resError(res,400, 'You must provide a comment object')
    }
    const comment = new Comment(body);
    console.log("creating comment: " + JSON.stringify(comment));
    if (!comment) {
        return resError(res,400, 'Comment Object Creation Failed in JavaScript')
    }
    comment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                comment: comment,
                message: 'Comment Created!'
            })
        })
        .catch(error => {
            return resError(res,400, 'Comment Not Created!')
        })
}

// get comment by id
getCommentByID = async (req, res) => {
    await Comment.findById({ _id: req.query._id }, (err, comment) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comment) {
            return resError(res,404, 'Comment Not Found!')
        }
        return res.status(200).json({ success: true, comment: comment })
    }).catch(err => console.log(err))
}

addRepliedComment = async (req,res) => {
    const body = req.query
    console.log("add replied comment: " + JSON.stringify(body));
    if (!body) {
        return resError(res,400, 'You must provide a body to update')
    }
    Comment.findOne({ _id: req.query.id }, (err, replyComment) => {
        console.log("Comment found: " + JSON.stringify(replyComment));
        if (err) {
            // ID is not found in published story and in published comic
            return resError(res,400, err)
        }
        if (!replyComment) {
            return resError(res,404, 'Comment Not Found!')
        }
        // ID found in published Comic table
        replyComment.replies.push(body.commentID);

        replyComment
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: replyComment._id,
                    message: 'Comment updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return resError(res,400, 'Comment not updated!')
            })
    })
}

// update comment array in published comic/story
addComment = async (req, res) => {
    const body = req.query
    console.log("add Comment: " + JSON.stringify(body));
    if (!body) {
        return resError(res,400, 'You must provide a body to update')
    }
    PublishedStory.findOne({ _id: req.query.id }, (err, publishedStory) => {
        console.log("PublishedStory found: " + JSON.stringify(publishedStory));
        if (err || !publishedStory) {
            // Published story is not found, try to found id in published comic
            PublishedComic.findOne({ _id: req.query.id }, (err, publishedComic) => {
                console.log("PublishedComic found: " + JSON.stringify(publishedComic));
                if (err) {
                    // ID is not found in published story and in published comic
                    return resError(res,400, err)
                }
                if (!publishedComic) {
                    return resError(res,400, 'PublishedComic and PublishedStory not found!')
                }
                // ID found in published Comic table
                publishedComic.comments.push(body.commentID);

                publishedComic
                    .save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: publishedComic._id,
                            message: 'PublishedComic updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return resError(res,400, 'PublishedComic not updated!')
                    })
            })
        }
        else {
                //ID found in published Story table
            publishedStory.comments.push(body.commentID);

            publishedStory
                .save()
                .then(() => {
                    console.log("SUCCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: publishedStory._id,
                        message: 'PublishedStory updated!',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return resError(res,400, 'PublishedStory not updated!')
                })
        }
        
    })
}

// update liked user list in a published comic when a user clicks like button
likeComic = async (req, res) =>{
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'UserID Not Found')
        }
        PublishedComic.findById(body.comicID, (err, comic) => {
            if (err) {
                return resError(res,400, err)
            }
            if (!comic) {
                return resError(res,404, 'comicID Not Found')
            }
            if (comic.likedUser.includes(body.userID)) {
                return resError(res,400, 'User Already Liked The Comic')
            }
            comic.likedUser.push(body.userID)
            comic.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    comicID: body.comicID,
                    message: "User Like A Comic Success"
                })
            })
        })
    })
}

// undo update liked user list in a published comic when a user clicks like button
undoLikeComic = async (req, res) =>{
    const body = req.query;
    await PublishedComic.findById(body.comicID, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'comicID Not Found')
        }
        let oldLen = comic.likedUser.length
        comic.likedUser.pull(body.userID)
        if (oldLen == comic.likedUser.length) {
            return resError(res,404, 'userID Not Found in liked users list in the published comic')
        }
        comic.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                comicID: body.comicID,
                message: 'Undo Liking A Comic Updated Successfully'
            })
        })
        
    })
}

// update liked user list in a published story when a user clicks like button
likeStory = async (req, res) =>{
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'UserID Not Found')
        }
        PublishedStory.findById(body.storyID, (err, story) => {
            if (err) {
                return resError(res,400, err)
            }
            if (!story) {
                return resError(res,404, 'storyID Not Found')
            }
            if (story.likedUser.includes(body.userID)) {
                return resError(res,400, 'User Already Liked The Story')
            }
            story.likedUser.push(body.userID)
            story.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    storyID: body.storyID,
                    message: "User Like A Story Success"
                })
            })
        })
    })
}

// undo update liked user list in a published story when a user clicks like button
undoLikeStory = async (req, res) =>{
    const body = req.query;
    await PublishedStory.findById(body.storyID, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'storyID Not Found')
        }
        let oldLen = story.likedUser.length
        story.likedUser.pull(body.userID)
        if (oldLen == story.likedUser.length) {
            return resError(res,404, 'userID Not Found in liked users list in the published story')
        }
        story.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                storyID: body.storyID,
                message: 'Undo Liking A Story Updated Successfully'
            })
        })
        
    })
}

// update and add the user to dislikedUser list in a published comic when a user clicks dislike button
dislikeComic = async (req, res) => {
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'UserID Not Found')
        }
        PublishedComic.findById(body.comicID, (err, comic) => {
            if (err) {
                return resError(res,400, err)
            }
            if (!comic) {
                return resError(res,404, 'comicID Not Found')
            }
            if (comic.dislikedUser.includes(body.userID)) {
                return resError(res,400, 'User Already Disliked The Comic')
            }
            comic.dislikedUser.push(body.userID)
            comic.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    comicID: body.comicID,
                    message: "User Dislike A Comic Success"
                })
            })
        })
    })
}

// undo and remove the disliked user from dislikeduser list in a published comic when a user clicks dislike button again
undoDislikeComic = async (req, res) =>{
    const body = req.query;
    await PublishedComic.findById(body.comicID, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'comicID Not Found')
        }
        let oldLen = comic.dislikedUser.length
        comic.dislikedUser.pull(body.userID)
        if (oldLen == comic.dislikedUser.length) {
            return resError(res,404, 'userID Not Found in disliked users list in the published comic')
        }
        comic.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                comicID: body.comicID,
                message: 'Undo Dislike A Comic Updated Successfully'
            })
        })
        
    })
}

// update and add the user to dislikedUser list in a published story when a user clicks dislike button
dislikeStory = async (req, res) =>{
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'UserID Not Found')
        }
        PublishedStory.findById(body.storyID, (err, story) => {
            if (err) {
                return resError(res,400, err)
            }
            if (!story) {
                return resError(res,404, 'storyID Not Found')
            }
            if (story.dislikedUser.includes(body.userID)) {
                return resError(res,400, 'User Already Disliked The Story')
            }
            story.dislikedUser.push(body.userID)
            story.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    storyID: body.storyID,
                    message: "User Dislike A Story Success"
                })
            })
        })
    })
}

// undo and remove the disliked user from dislikeduser list in a published story when a user clicks dislike button again
undoDislikeStory = async (req, res) =>{
    const body = req.query;
    await PublishedStory.findById(body.storyID, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'storyID Not Found')
        }
        let oldLen = story.dislikedUser.length
        story.dislikedUser.pull(body.userID)
        if (oldLen == story.dislikedUser.length) {
            return resError(res,404, 'userID Not Found in disliked users list in the published story')
        }
        story.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                storyID: body.storyID,
                message: 'Undo Dislike A Story Updated Successfully'
            })
        })
        
    })
}

// increment view number of a published comic
incComicView = async (req, res) => {
    const body = req.query;
    await PublishedComic.findByIdAndUpdate(body.comicID, {$inc: { viewNumber: 1}}, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'comicID Not Found')
        }
        return res.status(200).json({
            success: true,
            comicID: body.comicID,
            message: 'Increment View In A Comic Updated Successfully'
        })
    })
}

// increment view number of a published story
incStoryView = async (req, res) =>{
    const body = req.query;
    await PublishedStory.findByIdAndUpdate(body.storyID, {$inc: { viewNumber: 1}}, (err, story) => {
        if (err) {
            console.log(err)
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'storyID Not Found')
        }
        return res.status(200).json({
            success: true,
            storyID: body.storyID,
            message: 'Increment View In A Story Updated Successfully'
        })
    })
}

// add a published comic to a user's favorite comic list
favorComic = async (req, res) => {
    const body = req.query;
    await PublishedComic.findById(body.comicID, (err, comic) => {
        if (err) {
            console.log(err)
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'comicID Not Found')
        }
        User.findById(body.userID, (err, user) => {
            if (err) {
                console.log(err)
                return resError(res,400, err)
            }
            if (!user) {
                return resError(res,404, 'userID Not Found')
            }
            if (user.favoredComics.includes(body.comicID)) {
                return resError(res,400, 'User Already Favored The Comic')
            }
            user.favoredComics.push(body.comicID)
            user.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    comicID: body.comicID,
                    message: "User Favor A Comic Success"
                })
            })
        })
    })
}

// undo add a published comic to a user's favorite comic list
undoFavorComic = async (req, res) =>{
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'userID Not Found')
        }
        let oldLen = user.favoredComics.length
        user.favoredComics.pull(body.comicID)
        if (oldLen == user.favoredComics.length) {
            return resError(res,404, 'comicID Not Found in user\'s favored comics list')
        }
        user.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                comicID: body.comicID,
                message: 'Undo favor A Comic Updated Successfully'
            })
        })
        
    })
}

// add a published story to a user's favorite story list
favorStory = async (req, res) => {
    const body = req.query;
    await PublishedStory.findById(body.storyID, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'storyID Not Found')
        }
        User.findById(body.userID, (err, user) => {
            if (err) {
                return resError(res,400, err)
            }
            if (!user) {
                return resError(res,404, 'userID Not Found')
            }
            if (user.favoredStories.includes(body.storyID)) {
                return resError(res,400, 'User Already Favored The Story')
            }
            user.favoredStories.push(body.storyID)
            user.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    storyID: body.storyID,
                    message: "User Favor A Story Success"
                })
            })
        })
    })
}

// undo add a published story to a user's favorite story list
undoFavorStory = async (req, res) =>{
    const body = req.query;
    await User.findById(body.userID, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!user) {
            return resError(res,404, 'userID Not Found')
        }
        let oldLen = user.favoredStories.length
        user.favoredStories.pull(body.storyID)
        if (oldLen == user.favoredStories.length) {
            return resError(res,404, 'storyID Not Found in user\'s favored stories list')
        }
        user.save((err) => {
            if (err) {
                return resError(res,400, err)
            }
            return res.status(200).json({
                success: true,
                userID: body.userID,
                storyID: body.storyID,
                message: 'Undo favor A Story Updated Successfully'
            })
        })
        
    })
}


// when a comic is published create it in the published comic table
createPublishedComic = async (req, res) =>{
    const body = req.query;
    if (!body) {
        return resError(res,400, 'You must provide a published comic object')
    }
    const publishedComic = new PublishedComic(body);
    console.log("creating published comic: " + JSON.stringify(publishedComic));
    if (!publishedComic) {
        return resError(res,400, 'PublishedComic Object Creation Failed in JavaScript')
    }

    publishedComic
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                publishedComic: publishedComic,
                message: 'Published Comic Created!'
            })
        })
        .catch(error => {
            return resError(res,400, 'Published Comic Not Created!')
        })
}

// when a story is published create it in the published story table
createPublishedStory = async (req, res) =>{
    const body = req.query;
    if (!body) {
        return resError(res,400, 'You must provide a published story object')
    }

    const publishedStory = new PublishedStory(body);
    console.log("creating published story: " + JSON.stringify(publishedStory));
    if (!publishedStory) {
        return resError(res,400, 'PublishedStory Object Creation Failed in JavaScript')
    }

    publishedStory
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                publishedStory: publishedStory,
                message: 'Published Story Created!'
            })
        })
        .catch(error => {
            return resError(res,400, 'Published Story Not Created!')
        })
}

// get published comic by id
getPublishedComicByID = async (req, res) => {
    await PublishedComic.findById({ _id: req.query._id }, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,400, 'Comic not found!')
        }
        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}

// get published story by id
getPublishedStoryByID = async (req, res) => {
    await PublishedStory.findById({ _id: req.query._id }, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}

//get the search result for user
searchUserName = async(req,res) => {
    const body = req.params
    await User.find({userName: { "$regex": body.searchInput, "$options": "i" }}, (err, user) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.log(err))
}

// get unpublished comics by input
searchComicByInput = async (req, res) => {
    const body = req.query
    await Comic.find({$or:[{comicTitle: { "$regex": body.searchInput, "$options": "i" }},{authorName: { "$regex": body.searchInput, "$options": "i" }}]}, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}


// get unpublished stories by input
searchStoryByInput = async (req, res) => {
    const body = req.query
    await Story.find({$or:[{storyTitle: { "$regex": body.searchInput, "$options": "i" }},{authorName: { "$regex": body.searchInput, "$options": "i" }}]}, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}


// get published comics by input
searchPublishedComicByInput = async (req, res) => {
    const body = req.query
    await PublishedComic.find({$or:[{comicTitle: { "$regex": body.searchInput, "$options": "i" }},{authorName: { "$regex": body.searchInput, "$options": "i" }}]}, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}


// get published stories by input
searchPublishedStoryByInput = async (req, res) => {
    const body = req.query
    await PublishedStory.find({$or:[{storyTitle: { "$regex": body.searchInput, "$options": "i" }},{authorName: { "$regex": body.searchInput, "$options": "i" }}]}, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}




module.exports = {
    getCommunityComics,
    getCommunityStories,
    createComic,
    editComic,
    deleteComic,
    createStory,
    editStory,
    deleteStory,
    getComicByID,
    getStoryByID,
    getAllUserUnpublishedComics,
    getAllUserUnpublishedStories,
    getAllUserPublishedComics,
    getAllUserPublishedStories,
    createComment,
    addComment,
    likeComic,
    undoLikeComic,
    likeStory,
    undoLikeStory,
    dislikeComic,
    undoDislikeComic,
    dislikeStory,
    undoDislikeStory,
    incComicView,
    incStoryView,
    favorComic,
    undoFavorComic,
    favorStory,
    undoFavorStory,
    createPublishedComic,
    createPublishedStory,
    getPublishedComicByID,
    getPublishedStoryByID,
    getCommentByID,
    addRepliedComment,
    searchComicByInput,
    searchStoryByInput,
    searchPublishedStoryByInput,
    searchPublishedComicByInput,
    searchUserName
}