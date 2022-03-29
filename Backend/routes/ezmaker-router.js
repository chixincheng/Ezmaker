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
router.post('/createComic', tldrUpload.array("tldrFile", 10) , EasyMakerController.createComic)

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

// modify a partifuclar like user, dislike user, view number in pushlied comic
router.put('/editPublishedComic', auth.verify, EasyMakerController.editPublishedComic)

// modify a partifuclar like user, dislike user, view number in pushlied story
router.put('/editPublishedStory', auth.verify, EasyMakerController.editPublishedStory)

// create a new published comic object in the published comic table
router.post('/createPublishedComic', EasyMakerController.createPublishedComic)

// create a new published story object in the published story table
router.post('/createPublishedStory', auth.verify, EasyMakerController.createPublishedStory)

// get a specific published comic in PublishedComic table by id
router.get('/getPublishedComicByID', auth.verify, EasyMakerController.getPublishedComicByID)

// get a specific published story in PublishedStory table by id
router.get('/getPublishedStoryByID', auth.verify, EasyMakerController.getPublishedStoryByID)

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



module.exports = router