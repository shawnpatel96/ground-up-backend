const express = require("express");
const router = express.Router();
const Images = require("./image-model.js");
const bcrypt = require("bcryptjs");

//Multer Settings (image uploading)
const multer = require('multer')
const uploads = ('uploads') // our uploads folder
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, uploads)  // uploads here is our uploads folder
  },
  filename: function(req, file, cb){
    // Date.Now() here allows back-end to save files with the same name
    cb(null, Date.now() + file.originalname) 
  }
})
const fileFilter = (req,file,cb)=>{
  // Only accept jpeg or png's
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else{
    cb(new Error('Image must be JPEG or PNG and under 5MBS'), false);
  }
}
const upload = multer({
    storage: storage, 
    limits:{
    fileSize: 1024 * 1024 * 5 // Allow Image up to 5MBS
    },
    fileFilter: fileFilter
  });

  // Upload Image to User Avatar Field
router.put("/avatar/:id",upload.single('avatar'), async (req, res, next) => {
    req.body.avatar = req.file.path
    const { id } = req.params;
    try {
      const UpdatedUser = await Users.uploadAvatar(id, req.body);
      if (UpdatedUser) {
        res
          .status(200)
          .json({ message: "Image Uploaded Successfully!", count: UpdatedUser });
      } else {
        res
          .status(400)
          .json({ error: "Image Must be PNG or JPEG and under 5MBS" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not add Image to the Database: Back-end Issue" });
    }
  });