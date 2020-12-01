const multer = require('multer');
const gallerycontroller = require('../controllers/gallery.controller')

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log("file in multer.diskStorage", file);
      var filetype = '';
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'img-' + file.fieldname + Date.now() + '.' + filetype);
    }
  }),
  limits: {
    fileSize: 5000000 //5 Mb max size
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true);
  }
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/api/gallery/create', upload.single('file'), gallerycontroller.createGallery);
  app.get('/api/gallery/get', gallerycontroller.getImg);
  app.delete('/api/gallery/delete/:id', gallerycontroller.deleteImg);
  app.get('/api/gallery/image/:id',gallerycontroller.getSingleImg)
}