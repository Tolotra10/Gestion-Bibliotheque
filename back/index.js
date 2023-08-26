import express from 'express';
import postRoutes from './routes/livres.js';
import userRoutes from './routes/users.js';
import locationRoutes from './routes/location.js';
import cors from "cors"
import multer from 'multer';
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/livres",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/location",locationRoutes)

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"../front/public/upload")
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({ storage})


app.post('/api/upload',upload.single('file'),function(req,res){
        const file = req.file
        res.status(200).json(file.filename)
    })
app.listen(8080, ()=>{
    console.log(`Server run on port ${port}`);
});



