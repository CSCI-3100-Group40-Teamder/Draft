const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var connection = require('./db');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    }else {
      if(req.file == undefined ){
          res.render('index', {
            msg: 'Error: No File Selected!'
        });
      }else{

        //Upload to database
        user_id = 1;
        console.log(req.file.filename);
        var info = [[user_id,req.file.filename]];
        var sql = 'INSERT INTO imgUpload (user_id,filename) VALUES ?';
        connection.query(sql, [info], function (err, result) {
            if (err) throw err
        });

        //render to index
        res.render('index', {
          msg: 'File Uploaded!',
          file:`uploads/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));