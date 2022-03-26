const Comic = require('../models/comic-model');
const Story = require('../models/story-model');
const Comment = require('../models/comment-model');
const PublishedComic = require('../models/publishedComic-model');
const PublishedStory = require('../models/publishedStory-model');


// get community comics
getCommunityComics = async (req, res) => {
    await PublishedComic.find({}, (err, publishedComicList) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!publishedComicList.length) {
            return res
                .status(404)
                .json({ success: false, error: `Published comic list not found` })
        }
        return res.status(200).json({ success: true, data: publishedComicList })
    }).catch(err => console.log(err))
}

// get community stories
getCommunityStories = async (req, res) => {
    await PublishedStory.find({}, (err, publishedStoryList) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!publishedStoryList.length) {
            return res
                .status(404)
                .json({ success: false, error: `Published story list not found` })
        }
        return res.status(200).json({ success: true, data: publishedStoryList })
    }).catch(err => console.log(err))
}

//create comics
createComic = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comic object',
        })
    }

    const comic = new Comic(body);
    console.log("creating comic: " + JSON.stringify(comic));
    if (!comic) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Comic Not Created!'
            })
        })
}

//edit comics
editComic = async (req, res) => {
    const body = req.body
    console.log("updateComic: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Comic.findOne({ _id: req.params.id }, (err, comic) => {
        console.log("comic found: " + JSON.stringify(comic));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comic not found!',
            })
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
                return res.status(404).json({
                    error,
                    message: 'Comic not updated!',
                })
            })
    })
}

//delete the comic by id 
deleteComic = async (req, res) => {
    Comic.findById({ _id: req.params.id }, (err, comic) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comic not found!',
            })
        }
        Comic.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: comic })
        }).catch(err => console.log(err))
    })
}


//create stories
createStory = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a story object',
        })
    }

    const story = new Story(body);
    console.log("creating story: " + JSON.stringify(story));
    if (!story) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Story Not Created!'
            })
        })
}

//edit stories
editStory = async (req, res) => {
    const body = req.body
    console.log("updateStory: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Story.findOne({ _id: req.params.id }, (err, story) => {
        console.log("Story found: " + JSON.stringify(story));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Story not found!',
            })
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
                return res.status(404).json({
                    error,
                    message: 'Story not updated!',
                })
            })
    })
}

//delete the story by id 
deleteStory = async (req, res) => {
    Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Story not found!',
            })
        }
        Story.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: story })
        }).catch(err => console.log(err))
    })
}

// get comic by id
getComicByID = async (req, res) => {
    await Comic.findById({ _id: req.params.id }, (err, comic) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, story: comic })
    }).catch(err => console.log(err))
}

// get story by id
getStoryByID = async (req, res) => {
    await Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}

// get all user comics
getAllUserComics = async (req, res) => {
    await Comic.find({ }, (err, comicLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comicLists) {
            console.log("!comicLists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Comic not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in comicLists) {
                let comic = comicLists[key];
                if(comic.authorID === req.params._id){
                    let pair = {
                        _id: list._id,
                        authorID: list.authorID,
                        authorName: list.authorName,
                        editedTime: list.editedTime,
                        comicTitle: list.comicTitle
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// get all user stories
getAllUserStories = async (req, res) => {
    await Story.find({ }, (err, storyLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!storyLists) {
            console.log("!storyLists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Story not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in storyLists) {
                let story = storyLists[key];
                if(story.authorID === req.params._id){
                    let pair = {
                        _id: list._id,
                        authorID: list.authorID,
                        authorName: list.authorName,
                        editedTime: list.editedTime,
                        storyTitle: list.storyTitle
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
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a comment object',
        })
    }

    const comment = new Comment(body);
    console.log("creating comment: " + JSON.stringify(comment));
    if (!comment) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Comment Not Created!'
            })
        })
}
// update comment array in published comic/story
addComment = async (req, res) => {
    const body = req.body
    console.log("add Comment: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    PublishedStory.findOne({ _id: req.params.id }, (err, comment) => {
        console.log("PublishedStory found: " + JSON.stringify(comment));
        if (err) {
            // Published story is not found, try to found id in published comic
            PublishedComic.findOne({ _id: req.params.id }, (err, comment) => {
                console.log("PublishedComic found: " + JSON.stringify(comment));
                if (err) {
                    // ID is not found in published story and in published comic
                    return res.status(404).json({
                        err,
                        message: 'PublishedComic and PublishedStory not found!',
                    })
                }
                // ID found in published Comic table
                PublishedComic.comments = PublishedComic.comments.push(body)

                PublishedComic
                    .save()
                    .then(() => {
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: PublishedComic._id,
                            message: 'PublishedComic updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'PublishedComic not updated!',
                        })
                    })
            })
        }
        //ID found in published Story table
        PublishedStory.comments = PublishedStory.comments.push(body)

        PublishedStory
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: PublishedStory._id,
                    message: 'PublishedStory updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'PublishedStory not updated!',
                })
            })
    })
}
// Update like user, dislike user, view number in pushlied story
editPublishedStory = async (req, res) => {
    const body = req.body
    console.log("editPublishedStory: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PublishedStory.findOne({ _id: req.params.id }, (err, publishedStory) => {
        console.log("comic found: " + JSON.stringify(publishedStory));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Published Story not found!',
            })
        }

        publishedStory.dislikedUser = body.dislikedUser
        publishedStory.likedUser = body.likedUser
        publishedStory.viewNumber = body.viewNumber

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
                return res.status(404).json({
                    error,
                    message: 'PublishedStory not updated!',
                })
            })
    })
}
// Update like user, dislike user, view number in pushlied comic
editPublishedComic = async (req, res) => {
    const body = req.body
    console.log("editPublishedComic: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PublishedComic.findOne({ _id: req.params.id }, (err, publishedComic) => {
        console.log("comic found: " + JSON.stringify(publishedComic));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Published Story not found!',
            })
        }

        publishedComic.dislikedUser = body.dislikedUser
        publishedComic.likedUser = body.likedUser
        publishedComic.viewNumber = body.viewNumber

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
                return res.status(404).json({
                    error,
                    message: 'PublishedComic not updated!',
                })
            })
    })
}
// when a comic is published create it in the published comic table
createPublishedComic = async (req, res) =>{
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a published comic object',
        })
    }

    const publishedComic = new PublishedComic(body);
    console.log("creating published comic: " + JSON.stringify(publishedComic));
    if (!publishedComic) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Published Comic Not Created!'
            })
        })
}

// when a story is published create it in the published story table
createPublishedStory = async (req, res) =>{
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a published story object',
        })
    }

    const publishedStory = new PublishedStory(body);
    console.log("creating published story: " + JSON.stringify(publishedStory));
    if (!publishedStory) {
        return res.status(400).json({ success: false, error: err })
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
            return res.status(400).json({
                error,
                message: 'Published Story Not Created!'
            })
        })
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
    getAllUserComics,
    getAllUserStories,
    createComment,
    addComment,
    editPublishedStory,
    editPublishedComic,
    createPublishedComic,
    createPublishedStory
}