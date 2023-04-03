const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs =  require('file-system');
const mongoose = require('mongoose');
const user = require('./user');
const cors =  require('cors');
var cloudinary = require('cloudinary');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

cloudinary.config({ 
  cloud_name: "dvcwh1gaq",
  api_key: "862885473175857",
  api_secret: "11Weu7q8aczCXfsLqLK3RAw_K_Y",
  secure: true
});

const link = [];
 
app.get('/', (req, res) => {
   
  res.cookie("jwt","453");
   res.send('Hello World!')
})
  
const db = `mongodb+srv://sagar:admin000@cluster0.hbxgpqx.mongodb.net/mernstack?retryWrites=true&w=majority`
mongoose.connect(db).then(() => {
    console.log("connected")
}).catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: './uploads', 
  filename: function (req, file, cb) {  
    cb(null, file.originalname);  
  }
})  

var upload = multer({ storage: storage }) 

app.post('/upload', upload.single('image'), async (req, res) => { 
try{
  const {url,original_filename} = await cloudinary.uploader.upload(req.file.path);
  const photo = new user({ imgName:original_filename,image:url});
  await photo.save(); 
  res.send({url});   
}catch(err){ 
    console.log(err);     
} 
});
 
app.listen(5000);
  