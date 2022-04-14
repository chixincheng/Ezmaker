require('dotenv').config();
const auth = require('../auth')
const express = require('express')
const EasyMakerController = require('../controllers/ezmaker-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()
const multer = require("multer");
const { tldrStorage, cloudinary, imgStorage } = require("../cloudinary");
const imgUpload = multer({storage: imgStorage });
const tldrUpload = multer({ storage: tldrStorage });

// get all community comics from MongoDB
router.get('/communityComics', auth.verify, EasyMakerController.getCommunityComics)

// get all community stories from MongoDB
router.get('/communityStories', auth.verify, EasyMakerController.getCommunityStories)

// create a new comic object in Comic table
router.post('/createComic', auth.verify ,tldrUpload.array("tldrFile", 10) , EasyMakerController.createComic)

// modify a partifuclar comic object in Comic table by id
router.put('/editComic', auth.verify, EasyMakerController.editComic)

// delete a specific comic in Comic table by id
router.delete('/deleteComic', auth.verify, EasyMakerController.deleteComic)

// create a new story object in Story table
router.post('/createStory', auth.verify, EasyMakerController.createStory)

// modify a particular story object in Story table by id
router.put('/editStory', auth.verify, EasyMakerController.editStory)

// delete a specific story in Story table by id
router.delete('/deleteStory', auth.verify, EasyMakerController.deleteStory)

// get a specific comic in Comic table by id
router.get('/getComic', auth.verify, EasyMakerController.getComicByID)

// get a specific story in Story table by id
router.get('/getStory', auth.verify, EasyMakerController.getStoryByID)

// get all unpublished comics of this user
router.get('/getAllUserUnpublishedComics', auth.verify, EasyMakerController.getAllUserUnpublishedComics)

// get all unpublished stories of this user
router.get('/getAllUserUnpublishedStories', auth.verify, EasyMakerController.getAllUserUnpublishedStories)

// get all published comics of this user
router.get('/getAllUserPublishedComics', auth.verify, EasyMakerController.getAllUserPublishedComics)

// get all published stories of this user
router.get('/getAllUserPublishedStories', auth.verify, EasyMakerController.getAllUserPublishedStories)

// create a new comment
router.post('/createComment', auth.verify, EasyMakerController.createComment)

// modify a partifuclar comment array in published comic/story
router.put('/addComment', auth.verify, EasyMakerController.addComment)

// update liked user list in a published comic when a user clicks like button
router.put('/likeComic', auth.verify, EasyMakerController.likeComic)

// undo update liked user list in a published comic when a user clicks like button
router.put('/undoLikeComic', auth.verify, EasyMakerController.undoLikeComic)

// update liked user list in a published story when a user clicks like button
router.put('/likeStory', auth.verify, EasyMakerController.likeStory)

// undo update liked user list in a published story when a user clicks like button
router.put('/undoLikeStory', auth.verify, EasyMakerController.undoLikeStory)

// update and add the user to dislikedUser list in a published comic when a user clicks dislike button
router.put('/dislikeComic', auth.verify, EasyMakerController.dislikeComic)

// undo and remove the disliked user from dislikeduser list in a published comic when a user clicks dislike button again
router.put('/undoDislikeComic', auth.verify, EasyMakerController.undoDislikeComic)

// update and add the user to dislikedUser list in a published story when a user clicks dislike button
router.put('/dislikeStory', auth.verify, EasyMakerController.dislikeStory)

// undo and remove the disliked user from dislikeduser list in a published story when a user clicks dislike button again
router.put('/undoDislikeStory', auth.verify, EasyMakerController.undoDislikeStory)

// increment view number of a published comic
router.put('/incComicView', auth.verify, EasyMakerController.incComicView)

// increment view number of a published story
router.put('/incStoryView', auth.verify, EasyMakerController.incStoryView)

// add a published comic to a user's favorite comic list
router.put('/favorComic', auth.verify, EasyMakerController.favorComic)

// undo add a published comic to a user's favorite comic list
router.put('/undoFavorComic', auth.verify, EasyMakerController.undoFavorComic)

// add a published story to a user's favorite story list
router.put('/favorStory', auth.verify, EasyMakerController.favorStory)

// undo add a published story to a user's favorite story list
router.put('/undoFavorStory', auth.verify, EasyMakerController.undoFavorStory)

// create a new published comic object in the published comic table
router.post('/createPublishedComic', auth.verify, EasyMakerController.createPublishedComic)

// create a new published story object in the published story table
router.post('/createPublishedStory', auth.verify, EasyMakerController.createPublishedStory)

// get a specific published comic in PublishedComic table by id
router.get('/getPublishedComicByID', auth.verify, EasyMakerController.getPublishedComicByID)

// get a specific published story in PublishedStory table by id
router.get('/getPublishedStoryByID', auth.verify, EasyMakerController.getPublishedStoryByID)

// get a specific comment in Comment table by id
router.get('/getCommentByID', auth.verify, EasyMakerController.getCommentByID)

// modify a partifuclar comment array in Comment table
router.put('/addRepliedComment', auth.verify, EasyMakerController.addRepliedComment)

// get all the search result by user input in comic table
router.get('/searchComicByInput', auth.verify, EasyMakerController.searchComicByInput)

// get all the search result by user input in story table
router.get('/searchStoryByInput', auth.verify, EasyMakerController.searchStoryByInput)

// get all the search result by user input in published comic table
router.get('/searchPublishedComicByInput', auth.verify, EasyMakerController.searchPublishedComicByInput)

// get all the search result by user input in published story table
router.get('/searchPublishedStoryByInput', auth.verify, EasyMakerController.searchPublishedStoryByInput)

//get the search result for user
router.get('/searchUserName/:searchInput', auth.verify, EasyMakerController.searchUserName)



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
// Update user by id (password reset and user information change)
router.put('/user/:id', UserController.updateUser)

router.delete('/deleteUser', auth.verify, UserController.deleteUser)

router.put('/resetPassword', UserController.resetPassword)



module.exports = router