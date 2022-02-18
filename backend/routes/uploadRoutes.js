import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

//create disk to store
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//validate file type
const checkFileType = (file, cb) => {
  //make the file type
  const filtTypes = /jpg|jpeg|png/;
  //check the extension name of file
  const extname = filtTypes.test(path.extname(file.originalname).toLowerCase());
  //
  const mimetype = filtTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image format！'));
  }
};

//upload file
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//upload file route
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
