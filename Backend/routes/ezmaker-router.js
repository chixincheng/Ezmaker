const auth = require('../auth')
const express = require('express')
const EasyMakerController = require('../controllers/ezmaker-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

// get all community comics from MongoDB
router.get('/communityComics', auth.verify, EasyMakerController.getCommunityComics)

// get all community stories from MongoDB
router.get('/communityStories', auth.verify, EasyMakerController.getCommunityStories)

// create a new comic object in Comic table
router.post('/createComic', auth.verify, EasyMkaerController.createComic)

// modify a partifuclar comic object in Comic table by id
router.put('/editComic', auth.verify, EasyMakerController.editComic)

// delete a specific comic in Comic table by id
router.delete('/deleteComic', auth.verify, EasyMakerController.deleteComic)

// create a new story object in Story table
router.post('/createStory', auth.verify, EasyMkaerController.createStory)

// modify a particular story object in Story table by id
router.put('/editStory', auth.verify, EasyMakerController.editStory)

// delete a specific story in Story table by id
router.delete('/deleteStory', auth.verify, EasyMakerController.deleteStory)

// get a specific comic in Comic table by id
router.get('/getComic', auth.verify, EasyMakerController.getComic)

// get a specific story in Story table by id
router.get('/getStory', auth.verify, EasyMakerController.getStory)

// get all comics of this user
router.get('/getAllUserComics', auth.verify, EasyMakerController.getAllUserComics)

// get all stories of this user
router.get('/getAllUserStories', auth.verify, EasyMakerController.getAllUserStories)

//===================================================USER========================================================
// Handle's new user registration requests
router.post('/register', UserController.register)

// Handles ask if user logged in request
router.get('/loggedIn', UserController.loggedIn)

// Handles existing user login requests
router.post('/login', UserController.login)

// Handles logout user requests
router.get('/logout', UserController.logout)

// Get user by id
router.get('/user/:id', UserController.getUserById)
// Update user by id (password reset and user information change)
router.put('/user/:id', UserController.updateUser)


module.exports = router