import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// //for img Upload
// import multer from "multer";
// import path from "path";
// import bodyParser from "body-parser";
// import u_dependent_details from "./models/DependentModel.js";
// import { Sequelize } from "sequelize";
//
// // end for img
import db from "./config/Database.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
// //for image
// app.use(express.static("./public"))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// 
// var upload = multer({
//     storage: storage
// });
// app.post("/upload", upload.single('file'), (req, res) => {
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         console.log(req.file.filename)
//         var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
//         // var insertData = "INSERT INTO u_dependent_details (Relation) VALUES (?)"
//          u_dependent_details.create({
//
//                   Relation:imgsrc
//
//                });
//         // db.query(insertData, [imgsrc], (err, result) => {
//         //     if (err) throw err
//         //     console.log("file uploaded")
//         // })
//         console.log("file uploaded")
//     }
// });
// //for img
app.listen(5000, ()=> console.log('Server running at port 5000'));
