const Comic = require('../models/comic-model');
const Story = require('../models/story-model');
const Comment = require('../models/comment-model');
const User = require('../models/user-model')
const PublishedComic = require('../models/publishedComic-model');
const PublishedStory = require('../models/publishedStory-model');
const Playlist = require('../models/playlist-model');
const {cloudinary} = require("../cloudinary");
const { findOneAndUpdate } = require('../models/comic-model');
const { createDeflate } = require('zlib');
const chromium = require("chrome-aws-lambda");


function resError (res,errCode, err) {
    return res.status(errCode).json({
        success: false,
        message: err
    })
}

const FRONTEND_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3000/?exportMode'
//     : 
    'https://www.tldraw.com/?exportMode';

exportImage = async (req, res)=>{
    console.log("export");
    const { body } = req;
  const {
    size: [width, height],
    type,
  } = body;
  
  try {
    const browser = await chromium.puppeteer.launch({
      slowMo: 50,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      ignoreHTTPSErrors: true,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
    );
    await page.goto(FRONTEND_URL, { timeout: 15 * 1000, waitUntil: 'networkidle0' });
    await page.setViewport({ width: Math.floor(width), height: Math.floor(height) });
    await page.evaluateHandle('document.fonts.ready');
    let err = null;
    await page.evaluate(async (body) => {
      try {
        let app = window.app
        if (!app) app = await new Promise((resolve) => setTimeout(() => resolve(window.app), 250))
        await app.ready
        const { assets, shapes, currentPageId } = body
        // If the hapes were a direct child of their current page,
        // reparent them to the app's current page.
        shapes.forEach((shape) => {
          if (shape.parentId === currentPageId) {
            shape.parentId = app.currentPageId
          }
        })
        app.patchAssets(assets)
        app.createShapes(...shapes)
        app.selectAll()
        app.zoomToSelection()
        app.selectNone()
        const tlContainer = document.getElementsByClassName('tl-container').item(0) 
        if (tlContainer) {
          tlContainer.style.background = 'transparent'
        }
      } catch (e) {
        err = e.message
      }
    }, body)
    if (err) {
      throw err
    }
    const imageBuffer = await page.screenshot({
      type,
      omitBackground: true,
    })
    await browser.close()
    res.status(200).send(imageBuffer)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err)
  }
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
        return res.status(200).json({ success: true, comics: publishedComicList })
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
        return res.status(200).json({ success: true, stories: publishedStoryList })
    }).catch(err => console.log(err))
}

//create comics
createComic = (req, res) => {
    console.log(req.files);
    const body = req.query;
    body["filePath"] = req.files[0].path;
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
            return res.status(200).json({
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
    // console.log(body);
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
        if( req.query.authorID.localeCompare(comic.authorID )  !== 0 ){
            return resError(res,201, 'Comic no access!')
        }

        comic.comicTitle = body.comicTitle;
        comic.publishID = body.publishID;
        if(req.files !== undefined && req.files.length >= 1){
            const filePath = comic.filePath;
            var index1 = filePath.lastIndexOf(`Ezmaker`);
            var index2 = filePath.lastIndexOf(`.`);
            var cloudinary_id = filePath.substring(index1);
            console.log(cloudinary_id);
            cloudinary.uploader.destroy(cloudinary_id,  { resource_type:'raw'} ,function(error,result) {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                }
            });

            comic.filePath = req.files[0].path;
        }

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


editComicCoverPage = async (req, res) => {
    const body = req.query
    console.log(req.query);
    console.log(req.files);
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

        if( comic.coverPage ){
            const coverPage = comic.coverPage;
            var index1 = coverPage.lastIndexOf(`Ezmaker`);
            var index2 = coverPage.lastIndexOf(`.`);
            var cloudinary_id = coverPage.substring(index1,index2);
            cloudinary.uploader.destroy(cloudinary_id ,function(error,result) {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                }
            });
        }
        
        comic.coverPage = req.files[0].path;

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

editStoryCoverPage = async (req, res) => {
    const body = req.query
    console.log("query:"+req.query);
    console.log("files:"+req.files);
    console.log("updateStory cover page: " + JSON.stringify(body));
    if (!body || !body.id) {
        return resError(res,400, 'You must provide a body to update')
    }

    await Story.findOne({ _id: req.query.id }, (err, story) => {
        console.log("comic found: " + JSON.stringify(story));
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }

        if( story.coverPage ){
            const coverPage = story.coverPage;
            var index1 = coverPage.lastIndexOf(`Ezmaker`);
            var index2 = coverPage.lastIndexOf(`.`);
            var cloudinary_id = coverPage.substring(index1,index2);
            cloudinary.uploader.destroy(cloudinary_id ,function(error,result) {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                }
            });
        }
        
        story.coverPage = req.files[0].path;

        story
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: story._id,
                    message: 'story updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return resError(res,400, 'story not updated!')
            })
    })
}

//delete the comic by id 
deleteComic = async (req, res) => {
    console.log("--------");
    console.log(req.body);
    console.log(req.params)
    await Comic.findById({ _id: req.params.id }, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'Comic not found!')
        }

        //delete comic content
        const filePath = comic.filePath;
        var index1 = filePath.lastIndexOf(`Ezmaker`);
        var index2 = filePath.lastIndexOf(`.`);
        var cloudinary_id = filePath.substring(index1);
        console.log(cloudinary_id);
        cloudinary.uploader.destroy(cloudinary_id,  { resource_type:'raw'} ,function(error,result) {
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
            }
        });
        //delete comic cover page
        const coverPage = comic.coverPage;
        if(coverPage !== undefined){
            var index1 = coverPage.lastIndexOf(`Ezmaker`);
            var index2 = coverPage.lastIndexOf(`.`);
            var cloudinary_id = coverPage.substring(index1,index2);
            cloudinary.uploader.destroy(cloudinary_id ,function(error,result) {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                }
            });
        }

        //delete comic from mongodb
        Comic.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: comic })
        }).catch(err => console.log(err))
    })
}

//delete the published comic by id 
deletePublishedComic = async (req, res) => {
    console.log("--------");
    console.log(req.body);
    console.log(req.params)
    await PublishedComic.findById({ _id: req.params.id }, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'Comic not found!')
        }

        //delete comic from mongodb
        PublishedComic.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: comic })
        }).catch(err => console.log(err))
    })
}

//delete the published story by id 
deletePublishedStory = async (req, res) => {
    console.log("--------");
    console.log(req.body);
    console.log(req.params)
    await PublishedStory.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }

        //delete story from mongodb
        PublishedStory.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: story })
        }).catch(err => console.log(err))
    })
}



//create stories
createStory = (req, res) => {
    const body = req.query;
    body["filePath"] = req.file.path;
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
            console.log("create story success")
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
    console.log(body);
    // console.log("updateStory: " + JSON.stringify(body));
    if (!body || !body.id) {
        console.log('You must provide a body to update');
        return resError(res,400, 'You must provide a body to update')
    }

    Story.findOne({ _id: body.id }, (err, story) => {
        console.log("Story found: " + JSON.stringify(story));
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }
        if( req.query.authorID.localeCompare(story.authorID )  !== 0 ){
            return resError(res,201, 'Story no access!')
        }

        // update story title and publishID
        story.storyTitle = body.storyTitle
        story.publishID = body.publishID
        
        // update story content
        if (req.file != undefined) {
            const filePath = story.filePath;
            var index1 = filePath.lastIndexOf(`Ezmaker`);
            var index2 = filePath.lastIndexOf(`.`);
            var cloudinary_id = filePath.substring(index1);
            console.log("deleting old story content...")
            cloudinary.uploader.destroy(cloudinary_id,  { resource_type:'raw'} ,function(error,result) {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(result);
                }
            });
            story.filePath = req.file.path
        }

        // update story editedTime
        story.editedTime = new Date()

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
    await Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!story) {
            return resError(res,404, 'Story not found!')
        }
        Story.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: story })
        }).catch(err => console.log(err))
    })
}

// get comic by id
getComicByID = async (req, res) => {
    console.log("get comic by id: ");
    console.log(req.params);
    await Comic.findById({ _id: req.params.id }, (err, comic) => {
        if (err) {
            return resError(res,201, err)
        }
        if (!comic) {
            return resError(res,201, 'Comic not found!')
        }
        if( req.query.id.localeCompare(comic.authorID )  !== 0 ){
            return resError(res,201, 'Comic no access!')
        }

        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}

// get story by id
getStoryByID = async (req, res) => {
    console.log(req.params);
    await Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            console.log("getStory 400")
            return resError(res,400, err)
        }
        if (!story) {
            console.log("getstory 404")
            return resError(res,404, 'Story not found!')
        }
        if( req.query.id.localeCompare(story.authorID )  !== 0 ){
            return resError(res,201, 'Story no access!')
        }
        console.log("getStory success")
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}

// get all user's unpublished comics
getAllUserUnpublishedComics = async (req, res) => {
    await Comic.find({ authorID: req.params.id}, (err, comicList) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comicList) {
            return resError(res,404, 'Comic not found')
        }
        else {
            return res.status(200).json({ success: true, unpublishedComics: comicList })
        }
    }).catch(err => console.log(err))
}

// get all user's unpublished stories
getAllUserUnpublishedStories = async (req, res) => {
    await Story.find({authorID: req.params.id }, (err, storyList) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!storyList) {
            console.log("not found")
            return resError(res,404, 'Story not found')
            
        }
        else {
            return res.status(200).json({ success: true, unpublishedStories: storyList })
        }
    }).catch(err => console.log(err))
}

// get all user's published comics
getAllUserPublishedComics = async (req, res) => {
    await PublishedComic.find({authorID: req.params.id }, (err, comicList) => {
        if (err) {
            return resError(res,400, err)
        }
        // if (!comicList) {
        //     return resError(res,404, 'Published comic not found')
        // }
        else {
            return res.status(200).json({ success: true, publishedComics: comicList })
        }
    }).catch(err => console.log(err))
}


// get all user's published stories
getAllUserPublishedStories = async (req, res) => {
    await PublishedStory.find({authorID: req.params.id }, (err, storyList) => {
        if (err) {
            return resError(res,400, err)
        }
        // if (!storyList) {
        //     return resError(res,404, 'Story not found')
        // }
        else {
            return res.status(200).json({ success: true, publishedStories: storyList })
        }
    }).catch(err => console.log(err))
}


//get all the published comics
getAllPublishedComics = async(req,res) =>{
    await PublishedComic.find({ }, (err, comicLists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comicLists) {
            return resError(res,404, 'Published comic not found')
        }
        else {
            return res.status(200).json({ success: true, publishedComics: comicLists })
        }
    }).catch(err => console.log(err))
}

// create a new comment
createComment = async (req, res) => {
    // console.log("creating new comment")
    const body = req.query;

    if (body['isComic'] !== undefined) {
        body.isComic = body.isComic == 'true' ? true: false
    }
    if (body['isReplyToAnotherComment'] !== undefined) {
        body.isReplyToAnotherComment = body.isReplyToAnotherComment == 'true' ? true: false
    }

    // console.log(body)
    
    // check is PublishedComic or PublishedStory existed
    if (body['isComic'] !== undefined) {
        if (body.isComic == true) {
            try {
                await PublishedComic.findById(body.comicOrStoryID).orFail('Not Found')
            }
            catch (error) {
                if (error == "Not Found") return resError(res, 404, "comicID Not Found")
                return resError(res, 400, "PublishedComic findById Error")
            }
        }
        else {
            try {
                await PublishedStory.findById(body.comicOrStoryID).orFail('Not Found')
            }
            catch (error) {
                if (error == "Not Found") return resError(res, 404, "storyID Not Found")
                return resError(res, 400, "PublishedStory findById Error")
            }
        }
    }
    else {
        return resError(res, 400, "Must provide \'isComic\'")
    }
    

    // check is isReplyToAnotherComment existed
    if (body['isReplyToAnotherComment'] !== undefined) {
        if (body.isReplyToAnotherComment == true) {
            if (body['replyToCommentID'] !== undefined) {
                try {
                    await Comment.findOne({_id:body.replyToCommentID, isComic:body.isComic, comicOrStoryID:body.comicOrStoryID}).orFail('Not Found')
                }
                catch (error) {
                    if (error == "Not Found") return resError(res, 404, "replyToCommentID or replyToUserID Not Found or Not Matched In Current Comic or Story")
                    return resError(res, 400, "repliedComment Comment findOne Error")
                }
            }
            else {
                return resError(res, 400, "Must provide \'replyToCommentID\' when \'isReplyToAnotherComment\' is true")
            }
        }
        else if (body['replyToCommentID']  !== undefined || body['replyToUserID']  !== undefined) {
            return resError(res, 400, "No need to provide \'replyToCommentID\' or \'replyToUserID\' when \'isReplyToAnotherComment\' is false.")
        }
    }
    else {
        return resError(res, 400, "Must provide \'isReplyToAnotherComment\'")
    }

    // check is creatorID existed
    if (body['creatorID'] !== undefined) {
        try {
            await User.findById(body.creatorID).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "creatorID Not Found")
            return resError(res, 400, "creatorID: User findById Error")
        }
    }
    else {
        return resError(res, 400, "Must provide \'creatorID\'")
    }

    // check is content existed
    if (body['content'] === undefined) {
        return resError(res, 400, "Must provide \'content\'")
    }

    const comment = new Comment(body);
    if (!comment) {
        return resError(res,400, 'Comic Object Creation Failed in JavaScript')
    }

    comment
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                comment: comment,
                message: 'Comment Created!'
            })
        })
        .catch(error => {
            console.log(error)
            return resError(res,400, 'Comment Not Created!')
        })
}

// delete a comment
deleteComment = async (req, res) => {
    console.log('deleting Comment')
    body = req.params;
    console.log(body)
    // check is userID existed
    if (body['userID'] !== undefined) {
        try {
            await User.findById(body.userID).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "userID Not Found")
            return resError(res, 400, "userID: User findById Error")
        }
    }
    else {
        return resError(res, 400, "Must provide \'userID\'")
    }

    

    // check is commentID existed
    if (body['commentID'] !== undefined) {
        try {
            await Comment.deleteMany({replyToCommentID: body.commentID});
            var delComment = await Comment.findOneAndDelete({_id:body.commentID, creatorID:body.userID}).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "Not Found: commentID Not Found or No Comment has commentID as _id and userID as creatorID")
            return resError(res, 400, "Comment findOneAndDelete Error")
        }
    }
    else {
        return resError(res, 400, "Must provide \'commentID\'")
    }

    return res.status(200).json({
        success: true,
        deletedComment: delComment,
        message: "Delete A Comment Success"
    })
}

// get Comments
getComments = async (req, res) => {
    let body = JSON.parse(JSON.stringify(req.query)); // deep copy of req.query
    
    // check existence of parameters
    if (body['isComic'] == undefined || body.isComic == 'null' || (body.isComic != 'true' && body.isComic != 'false'))
        return resError(res, 400, "Must provide \'isComic\'")
    else
        body.isComic = body.isComic == 'true' ? true: false;

    if (body['isReplyToAnotherComment'] == undefined || body.isReplyToAnotherComment == 'null' || (body.isReplyToAnotherComment != 'true' && body.isReplyToAnotherComment != 'false'))
        return resError(res, 400, "Must provide \'isReplyToAnotherComment\'")
    else
        body.isReplyToAnotherComment = body.isReplyToAnotherComment == 'true' ? true: false;

    if (body['skip'] === undefined || body.skip == 'null')
        return resError(res, 400, "Must provide \'skip\'")
    else
        body.skip = parseInt(body.skip)

    if (body['limit'] === undefined || body.limit == 'null')
        return resError(res, 400, "Must provide \'limit\'")
    else
        body.limit = parseInt(body.limit)


    // console.log("getComments: ")
    // console.log(body)


    // check is PublishedComic or PublishedStory existed
    if (body.isComic == true) {
        try {
            await PublishedComic.findById(body.comicOrStoryID).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "comicID Not Found")
            return resError(res, 400, "PublishedComic findById Error")
        }
    }
    else {
        try {
            await PublishedStory.findById(body.comicOrStoryID).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "storyID Not Found")
            return resError(res, 400, "PublishedStory findById Error")
        }
    }

    // check is replyToCommentID existed
    if (body.isReplyToAnotherComment == true) {
        if (body['replyToCommentID'] != 'null') {
            try {
                await Comment.findOne({_id:body.replyToCommentID, isComic:body.isComic, comicOrStoryID:body.comicOrStoryID}).orFail('Not Found')
            }
            catch (error) {
                if (error == "Not Found") return resError(res, 404, "replyToCommentID Not Found In Current Comic or Story")
                return resError(res, 400, "repliedComment Comment findById Error")
            }
        }
        else {
            return resError(res, 400, "Must provide \'replyToCommentID\' when \'isReplyToAnotherComment\' is true")
        }
    }
    else if (body['replyToCommentID'] !== undefined) {
        return resError(res, 400, "No need to provide \'replyToCommentID\' when \'isReplyToAnotherComment\' is false.")
    }

    // get comments by limit and skips
    let filter = {
        isComic: body.isComic, 
        comicOrStoryID: body.comicOrStoryID, 
        isReplyToAnotherComment: body.isReplyToAnotherComment,
    }
    if (body.isReplyToAnotherComment) {
        filter['replyToCommentID'] = body.replyToCommentID;
    }
    let response = await Comment.find(
                filter, 
                {
                    isComic: 0, 
                    comicOrStoryID: 0
                }, 
                {
                    sort:{
                        createdAt:1
                    }
                }
            );
    // console.log("Results:==========================")
    // console.log(body)
    // console.log(response)
    let totalCount = response.length;
    let endIndex = (body.skip + body.limit) > totalCount ? totalCount : (body.skip + body.limit);
    response = response.slice(body.skip, endIndex)

    
    return res.status(200).json({
        success: true,
        totalCount: totalCount,
        comments: response,
        message: "Get Comments Success"
    })
    
    
}

// update liked user list in a published comic when a user clicks like button
likeComic = async (req, res) =>{
    const body = req.query;
    // console.log(body);
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
            if(comic.dislikedUser.includes(body.userID)){
                comic.dislikedUser.pull(body.userID);
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
                    likedUserArr: comic.likedUser,
                    dislikedUserArr: comic.dislikedUser,
                    message: "User Like A Comic Success"
                })
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
            if(comic.likedUser.includes(body.userID)){
                comic.likedUser.pull(body.userID);
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
                    likedUserArr: comic.likedUser,
                    dislikedUserArr: comic.dislikedUser,
                    message: "User Dislike A Comic Success"
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
                likedUserArr: comic.likedUser,
                message: 'Undo Liking A Comic Updated Successfully'
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
                dislikedUserArr: comic.dislikedUser,
                message: 'Undo Dislike A Comic Updated Successfully'
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
            if(story.dislikedUser.includes(body.userID)){
                story.dislikedUser.pull(body.userID);
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
                    likedUserArr: story.likedUser,
                    dislikedUserArr: story.dislikedUser,
                    message: "User Like A Story Success"
                })
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
            if(story.likedUser.includes(body.userID)){
                story.likedUser.pull(body.userID);
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
                    likedUserArr: story.likedUser,
                    dislikedUserArr: story.dislikedUser,
                    message: "User Dislike A Story Success"
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
                likedUserArr: story.likedUser,
                message: 'Undo Liking A Story Updated Successfully'
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
                dislikedUserArr: story.dislikedUser,
                message: 'Undo Dislike A Story Updated Successfully'
            })
        })
        
    })
}

// increment view number of a published comic
incComicView = async (req, res) => {
    const body = req.query;
    await PublishedComic.findByIdAndUpdate(body.comicID, {$inc: { viewNumber: 0.5}}, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!comic) {
            return resError(res,404, 'comicID Not Found')
        }
        return res.status(200).json({
            success: true,
            comicID: body.comicID,
            viewnum: comic.viewNumber,
            message: 'Increment View In A Comic Updated Successfully'
        })
    })
}

// increment view number of a published story
incStoryView = async (req, res) =>{
    const body = req.query;
    await PublishedStory.findByIdAndUpdate(body.storyID, {$inc: { viewNumber: 0.5}}, (err, story) => {
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
            viewnum: story.viewNumber,
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
            user.favoredComics.push(body.comicID);
            user.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    comicID: body.comicID,
                    favoredComics:user.favoredComics,
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
        user.favoredComics.pull(body.comicID);
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
                favoredComics:user.favoredComics,
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
            user.favoredStories.push(body.storyID);
            user.save((err) => {
                if (err) {
                    return resError(res,400, err)
                }
                return res.status(200).json({
                    success: true,
                    userID: body.userID,
                    storyID: body.storyID,
                    favoredStories: user.favoredStories,
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
        user.favoredStories.pull(body.storyID);
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
                favoredStories: user.favoredStories,
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
    await PublishedComic.findById({ _id: req.params.id }, (err, comic) => {
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
    // console.log("getPublsihedStoryByID: " + req.params.id)
    await PublishedStory.findById({ _id: req.params.id }, (err, story) => {
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
    const body = req.params
    await PublishedComic.find({comicTitle: { "$regex": body.searchInput, "$options": "i" }}, (err, comic) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, comic: comic })
    }).catch(err => console.log(err))
}


// get published stories by input
searchPublishedStoryByInput = async (req, res) => {
    const body = req.params
    await PublishedStory.find({storyTitle: { "$regex": body.searchInput, "$options": "i" }}, (err, story) => {
        if (err) {
            return resError(res,400, err)
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}


createPlaylist = async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.query))
    console.log("in creating")
    console.log(JSON.stringify(body))
    if (body['isComic'] === undefined) {
        return resError(res, 400, "Must provide \'isComic\'")
    }
    if (body['creatorID'] === undefined) {
        return resError(res, 400, "Must provide \'creatorID\'")
    }
    if (body['title'] === undefined) {
        return resError(res, 400, "Must provide \'title\'")
    }
    else if (body['title'] == "") {
        return resError(res, 400, "title must be non-empty")
    }
    if (body['elementIDSeries'] === undefined) {
        return resError(res, 400, "Must provide \'elementIDSeries\'")
    }

    // check is creatorID existed
    try {
        await User.findById(body.creatorID).orFail('Not Found')
    }
    catch (error) {
        if (error == "Not Found") return resError(res, 404, "creatorID Not Found")
        return resError(res, 400, "creatorID: User findById Error")
    }

    const playlist = new Playlist(body);
    if (!playlist) {
        return resError(res,400, 'Playlist Object Creation Failed in JavaScript')
    }

    playlist
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!'
            })
        })
        .catch(error => {
            console.log(error)
            return resError(res,400, 'Playlist Not Created!')
        })
}

updatePlaylist = async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.query))
    if (body['playlistID'] === undefined) {
        return resError(res, 400, "Must provide \'playlistID\'")
    }
    if (body['userID'] === undefined) {
        return resError(res, 400, "Must provide \'userID\'")
    }
    if (body['title'] === undefined) {
        return resError(res, 400, "Must provide \'title\'")
    }
    else if (body['title'] == "") {
        return resError(res, 400, "title must be non-empty")
    }
    if (body['elementIDSeries'] === undefined) {
        return resError(res, 400, "Must provide \'elementIDSeries\'")
    }

    await Playlist.findOneAndUpdate(
        {  // filter
            _id: body.playlistID, 
            creatorID: body.userID 
        }, 
        { // updated info
            title: body.title, 
            elementIDSeries: body.elementIDSeries
        },
        (err, newPlaylist) => { // callback
        if (err) {
            return resError(res,400, err)
        }
        if (!newPlaylist) {
            return resError(res,404, 'Playlist not found!')
        }
        return res.status(200).json({
            success: true,
            playlist: newPlaylist,
            message: 'Playlist Created!'
        })
    })
}

getUserPlaylists = async (req, res) => {
    let body = JSON.parse(JSON.stringify(req.query))
    // console.log(body);
    // let body = {
    //     creatorID: req.params.creatorID,
    //     isComic: req.query.isComic
    // }
    console.log(body);
    await Playlist.find({creatorID: body.creatorID, isComic: body.isComic }, null, {sort:{createdAt:1}}, (err, playlists) => {
        if (err) {
            return resError(res,400, err)
        }
        if (!playlists) {
            return resError(res,404, 'Playlists not found')
        }
        else {
            return res.status(200).json({ success: true, playlists: playlists })
        }
    }).catch(err => console.log(err))
}


deletePlaylist = async (req, res) => {
    let body = JSON.parse(JSON.stringify(req.params))

    // check is creatorID existed
    if (body['creatorID'] !== undefined) {
        try {
            await User.findById(body.creatorID).orFail('Not Found')
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "creatorID Not Found")
            return resError(res, 400, "creatorID: User findById Error")
        }
    }
    else {
        return resError(res, 400, "Must provide \'craetorID\'")
    }

    

    // check is playlistID existed
    if (body['playlistID'] !== undefined) {
        try {
            await Playlist.findOneAndDelete({_id: body.playlistID, creatorID: body.creatorID});
        }
        catch (error) {
            if (error == "Not Found") return resError(res, 404, "Not Found: playlistID Not Found or No Playlist has playlistID as _id and creatorID as creatorID")
            return resError(res, 400, "Playlist findOneAndDelete Error")
        }
    }
    else {
        return resError(res, 400, "Must provide \'playlistID\'")
    }

    return res.status(200).json({
        success: true,
        deletedPlaylistID: body.playlistID,
        message: "Delete A Playlist Success"
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
    getAllUserUnpublishedComics,
    getAllUserUnpublishedStories,
    getAllUserPublishedComics,
    getAllUserPublishedStories,
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
    searchComicByInput,
    searchStoryByInput,
    searchPublishedStoryByInput,
    searchPublishedComicByInput,
    searchUserName,
    editComicCoverPage,
    editStoryCoverPage,
    getAllPublishedComics,
    deletePublishedComic,
    deletePublishedStory,
    createComment,
    deleteComment,
    getComments,
    createPlaylist,
    updatePlaylist,
    getUserPlaylists,
    deletePlaylist,
    exportImage
}