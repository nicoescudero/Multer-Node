const express=require('express');
const app=express();
const path=require('path');
const multer=require('multer');
const {v4 : uuid}=require('uuid');
//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));
app.use('/public',express.static(path.resolve(__dirname,'public')));

//middleware
const storage=multer.diskStorage({
    destination:path.join(__dirname,'./public/uploads'),
    filename:(req,file,cb)=>{
        cb(null,uuid()+path.extname(file.originalname));
    }
});
const config=multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    limits:{fileSize:5000000},
    fileFilter:(req,file,cb)=>{
        const types=/jpeg|jpg|png|gif/;
        const mimetype=types.test(file.mimetype);
        const extname=types.test(path.extname(file.originalname));
        if(mimetype && extname)return cb(null,true);
        cb("Error: el archivo debe ser una imagen");
    }
}).single('image');

app.use(config,require('./routes/routeProject'))

app.listen(app.get('port'),()=>console.log('Port: ',app.get('port')));