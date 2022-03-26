const Comic = require('../models/comic-model');
const Story = require('../models/story-model');
const Comment = require('../models/comment-model');
const PublishedComic = require('../models/publishedComic-model');
const PublishedStory = require('../models/publishedStory-model');

/*
createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.ownerEmail = body.ownerEmail
        top5List.comments = body.comments
        top5List.Author = body.Author
        top5List.like = body.like
        top5List.dislike = body.dislike
        top5List.view = body.view
        top5List.publish = body.publish
        top5List.createdate = body.createdate
        top5List.viewing = body.viewing
        top5List.publishdate = body.publishdate
        top5List.isCommunityList = body.isCommunityList
        top5List.updateDate = body.updateDate
        top5List.commentItems = body.commentItems

        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    ownerEmail: list.ownerEmail,
                    items: list.items,
                    comments: list.comments,
                    Author: list.Author,
                    like: list.like,
                    dislike: list.dislike,
                    view: list.view,
                    publish: list.publish,
                    createdate: list.createdate,
                    publishdate: list.publishdate,
                    isCommunityList: list.isCommunityList,
                    updateDate: list.updateDate,
                    commentItems: list.commentItems
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

getCommunityList = async (req, res) => {
    await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                if(list.isCommunityList){
                    let pair = {
                        _id: list._id,
                        name: list.name,
                        items: list.items,
                        comments: list.comments,
                        like: list.like,
                        dislike: list.dislike,
                        view: list.view,
                        publish: list.publish,
                        createdate: list.createdate,
                        publishdate: list.publishdate,
                        isCommunityList: list.isCommunityList,
                        updateDate: list.updateDate,
                        commentItems: list.commentItems
                    };
                    pairs.push(pair);
                }
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListPairs,
    getTop5ListById,
    getCommunityList
}*/

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
    getAllUserStories
}