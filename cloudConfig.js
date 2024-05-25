const cloudinary = require('cloudinary').v2;
const { fileLoader } = require('ejs');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

// to connect cloudinary with backend
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// define storage where data will be stored
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormat:['jpg','png','jpeg'],
    },
  });

module.exports={
    cloudinary,storage
}