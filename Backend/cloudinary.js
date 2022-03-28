require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { raw } = require('body-parser');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
   
});
process.env.GLOBAL_TEST = "456";

const tldrStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:'Ezmaker',
        resource_type:"auto",
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif', 'tif',"tldr"],
        format: "tldr"
      
    }
    
});

const imgStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:'Ezmaker',
        resource_type:"auto",
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif', 'tif',"tldr"]
      
    }
    
});



module.exports = {
    cloudinary,
    tldrStorage,
    imgStorage
}