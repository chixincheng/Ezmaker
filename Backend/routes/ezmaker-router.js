require('dotenv').config();
const auth = require('../auth')
const express = require('express')
const EasyMakerController = require('../controllers/ezmaker-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()
const multer = require("multer");
const { tldrStorage, quillStorage, cloudinary, imgStorage } = require("../cloudinary");
const imgUpload = multer({storage: imgStorage });
const tldrUpload = multer({ storage: tldrStorage });
const quillUpload = multer({ storage: quillStorage});

// get all community comics from MongoDB
router.get('/communityComics', auth.verify, EasyMakerController.getCommunityComics)

// get all community stories from MongoDB
router.get('/communityStories', auth.verify, EasyMakerController.getCommunityStories)

// create a new comic object in Comic table
router.post('/createComic', auth.verify ,tldrUpload.array("tldrFile", 10) , EasyMakerController.createComic)

// modify a partifuclar comic object in Comic table by id
router.put('/editComic', auth.verify,  tldrUpload.array("tldrFile", 1),  EasyMakerController.editComic)

router.put('/editComicCoverPage', auth.verify,   imgUpload.array("imgFile", 1)  , EasyMakerController.editComicCoverPage)

router.put('/editStoryCoverPage', auth.verify,   imgUpload.array("imgFile", 1)  , EasyMakerController.editStoryCoverPage)

// delete a specific comic in Comic table by id
router.delete('/deleteComic/:id', auth.verify, EasyMakerController.deleteComic) 

// delete a specific published comic in published Comic table by id
router.delete('/deletePublishedComic/:id', auth.verify, EasyMakerController.deletePublishedComic)

// create a new story object in Story table
router.post('/createStory', auth.verify, quillUpload.single("quillFile"), EasyMakerController.createStory)

// modify a particular story object in Story table by id
router.put('/editStory', auth.verify, quillUpload.single("quillFile"), EasyMakerController.editStory)

// delete a specific story in Story table by id
router.delete('/deleteStory/:id', auth.verify, EasyMakerController.deleteStory)

// delete a specific published story in published Story table by id
router.delete('/deletePublishedStory/:id', auth.verify, EasyMakerController.deletePublishedStory)

// get a specific comic in Comic table by id
router.put('/getComic/:id', auth.verify, EasyMakerController.getComicByID)

// get a specific story in Story table by id
router.put('/getStory/:id', auth.verify, EasyMakerController.getStoryByID)

// get all unpublished comics of this user
router.get('/getAllUserUnpublishedComics/:id', auth.verify, EasyMakerController.getAllUserUnpublishedComics)

// get all unpublished stories of this user
router.get('/getAllUserUnpublishedStories/:id', auth.verify, EasyMakerController.getAllUserUnpublishedStories)

// get all published comics of this user 
router.get('/getAllUserPublishedComics/:id',  EasyMakerController.getAllUserPublishedComics)


// get all published stories of this user
router.get('/getAllUserPublishedStories/:id', auth.verify, EasyMakerController.getAllUserPublishedStories)

// create a new comment
router.post('/createComment', EasyMakerController.createComment)

// delete a comment
router.delete('/deleteComment/:commentID/:userID', auth.verify, EasyMakerController.deleteComment)

// get Comments
router.put('/getComments/:id', EasyMakerController.getComments)
// router.get('/getComments/:isComic/:comicOrStoryID/:isReplyToAnotherComment/:replyToCommentID/:skip/:limit', auth.verify, EasyMakerController.getComments)

// update liked user list in a published comic when a user clicks like button
router.put('/likeComic/:id', auth.verify, EasyMakerController.likeComic)

// undo update liked user list in a published comic when a user clicks like button
router.put('/undoLikeComic/:id', auth.verify, EasyMakerController.undoLikeComic)

// update liked user list in a published story when a user clicks like button
router.put('/likeStory/:id', auth.verify, EasyMakerController.likeStory)

// undo update liked user list in a published story when a user clicks like button
router.put('/undoLikeStory/:id', auth.verify, EasyMakerController.undoLikeStory)

// update and add the user to dislikedUser list in a published comic when a user clicks dislike button
router.put('/dislikeComic/:id', auth.verify, EasyMakerController.dislikeComic)

// undo and remove the disliked user from dislikeduser list in a published comic when a user clicks dislike button again
router.put('/undoDislikeComic/:id', auth.verify, EasyMakerController.undoDislikeComic)

// update and add the user to dislikedUser list in a published story when a user clicks dislike button
router.put('/dislikeStory/:id', auth.verify, EasyMakerController.dislikeStory)

// undo and remove the disliked user from dislikeduser list in a published story when a user clicks dislike button again
router.put('/undoDislikeStory/:id', auth.verify, EasyMakerController.undoDislikeStory)

// increment view number of a published comic
router.put('/incComicView/:id', auth.verify, EasyMakerController.incComicView)

// increment view number of a published story
router.put('/incStoryView/:id', auth.verify, EasyMakerController.incStoryView)

// add a published comic to a user's favorite comic list
router.put('/favorComic/:id', auth.verify, EasyMakerController.favorComic)

// undo add a published comic to a user's favorite comic list
router.put('/undoFavorComic/:id', auth.verify, EasyMakerController.undoFavorComic)

// add a published story to a user's favorite story list
router.put('/favorStory/:id', auth.verify, EasyMakerController.favorStory)

// undo add a published story to a user's favorite story list
router.put('/undoFavorStory/:id', auth.verify, EasyMakerController.undoFavorStory)

// create a new published comic object in the published comic table
router.post('/createPublishedComic', auth.verify, EasyMakerController.createPublishedComic)

// create a new published story object in the published story table
router.post('/createPublishedStory', auth.verify, EasyMakerController.createPublishedStory)

// get a specific published comic in PublishedComic table by id
router.get('/getPublishedComicByID/:id', auth.verify, EasyMakerController.getPublishedComicByID)

// get a specific published story in PublishedStory table by id
router.get('/getPublishedStoryByID/:id', auth.verify, EasyMakerController.getPublishedStoryByID)

// get all the search result by user input in comic table
router.get('/searchComicByInput', auth.verify, EasyMakerController.searchComicByInput)

// get all the search result by user input in story table
router.get('/searchStoryByInput', auth.verify, EasyMakerController.searchStoryByInput)

// get all the search result by user input in published comic table
router.get('/searchPublishedComicByInput/:searchInput', auth.verify, EasyMakerController.searchPublishedComicByInput)

// get all the search result by user input in published story table
router.get('/searchPublishedStoryByInput/:searchInput', auth.verify, EasyMakerController.searchPublishedStoryByInput)

//get the search result for user
router.get('/searchUserName/:searchInput', auth.verify, EasyMakerController.searchUserName)

//create a new playlist
router.post('/createPlaylist', EasyMakerController.createPlaylist)

//get a user's all playlists
router.put('/getUserPlaylists', EasyMakerController.getUserPlaylists)

// update ausr's playlist
router.put('/updatePlaylist', EasyMakerController.updatePlaylist)

// delete a playlist by the creator
router.delete('/deletePlaylist/:playlistID/:creatorID', EasyMakerController.deletePlaylist)

router.post('/api/export', EasyMakerController.exportImage)

//===================================================USER========================================================
// Handle's new user registration requests
router.post('/register', UserController.registerUser)

// Handles ask if user logged in request
router.get('/loggedIn', UserController.getLoggedIn)

// Handles existing user login requests
router.post('/login', UserController.loginUser)

// Handles logout user requests
router.get('/logout', UserController.logoutUser)

// Get user by id
router.get('/user/:id', UserController.getUserById)

// Get username and profile picture by id
router.get('/getUsernameAndProfilePicByID/:userID', UserController.getUsernameAndProfilePicByID)

// Update user by id (password reset and user information change)
router.put('/user/:id',  auth.verify ,imgUpload.array("imgFile", 1)  ,UserController.updateUser)

router.delete('/deleteUser', auth.verify, UserController.deleteUser)

router.put('/resetPassword', UserController.resetPassword)

router.put('/verificationRequest', UserController.verificationRequest)



module.exports = router