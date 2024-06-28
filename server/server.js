const express=require("express");
const app=express();

const userRoutes=require('./routes/userRoutes');
const paymentRoutes=require('./routes/paymentRoutes');
const profileRoutes=require("./routes/profileRoutes");
const courseRoutes=require('./routes/courseRoutes');

const dbConnect=require('./config/database');
const cloudinary=require("./config/cloudinary");
const cors=require('cors');
const cookieParser=require('cookie-parser');

const fileUpload=require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 4000;






app.use(express.json());
app.use(cookieParser());

app.use(cors({
        origin:"https://study-notion-eta-jet.vercel.app",
        methods:["POST","GET","PUT","DELETE"],
        credentials:true,
}))


// connection to cloudinary

cloudinary.cloudinaryConnect();

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/temp/" }));


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);


app.get("/",(req,res) =>{
    return res.json({message:"your server is up and running"});
})
 

// app.listen(4000,() =>{
//     console.log(`server is running at 4000`);
// })

app.listen(PORT,() =>{
    console.log(`server is running at ${PORT}`);
})

// connected database
dbConnect();

// "node_modules/razorpay": {  1656
//     "version": "0.0.0",
//     "resolved": "https://registry.npmjs.org/razorpay/-/razorpay-0.0.0.tgz",
//     "integrity": "sha512-KkS1YxHC0lp8SkztkNTsfSLrftmYIqCLM2xFbM0ebqFStgavQFBPLARcMH0t2uuOflWdRWWbqW7W9xjlBgfczg=="
//   },