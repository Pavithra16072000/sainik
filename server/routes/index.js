import express from "express";
//for img Upload
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import u_dependent_details from "../models/DependentModel.js";
import u_file_details from "../models/FileModel.js";
import u_Sfile_details from "../models/SpouseFileModel.js";
import u_Dfile_details from "../models/DependentFileModel.js";

import { Sequelize } from "sequelize";

// end for img
import { getUsers, Register, ULogin, Logout , Form1, Form2, Form3, Form4, Form5, Form6,Form7,Form8,Forms, WidowForm,getForm1, EditForm8 , form7deletes,form8dep, Form7Edit, Form7Delete,capt, ForgetPass,Login, getForgetMail,getUserStatus, TableFilter} from "../controllers/Users.js";
// import { Religion_D, Corp_D,  Record_D,  Rank_D, Trade_D, Civil_D, Char_D, Med_D, Bank_D, Branch_D,Caste_D,BirthDist_D, BirthPlace_D, Dependents } from "../controllers/Dropdown.js";
import { Service_D,District_D,District_Depend, Corp_D, State_D, Taluk_D, Record_D,  Rank_D,Rank_Category_D, Trade_D, Civil_D, Char_D,Reason_D, Med_D, Bank_D, Branch_Depend, IFSC_Depend ,Caste_D, Religions_D,  Dependents,getRsb,getZsb, Taluk_Depend } from "../controllers/Dropdown1.js";

import { getAdmin, ARegister, ALogin,clerkUsers,Designation, ALogout, Status,Single,ClerkQ,SuperintendentQ,DirectorQ, getClerkQ,adminform1, adminform2,adminform3, adminform4, adminform5, adminform6, adminform7, awidowform,Recommend,Approve,Verify,getReg,getService_Name,TFService,getForgetMail1,AdminFormDoc,AS_DocForm,AD_DocForm,Users_C,Users_S,Users_D,Prev_ESM,ESM_No,ZR} from "../controllers/Admin.js";
import { Rsb,Zsb,Bank,Rank,District,MedicalCategory,RecordOfficeArmy,State,Taluk,Trade,F_rsb,F_zsb,F_bank,F_MedicalCat,F_Rank,F_RecordOfficeArmy,F_RegCategory,F_State,F_District,F_Taluk,F_Trade, Filter,ReactFilter} from "../controllers/Insert.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, adminRefreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
// const path= require('path')
// import path from "path";

router.get('/capt',capt);

router.get('/admin', verifyToken, getAdmin);
router.post('/admin', ARegister);
router.post('/alogin', ALogin);
router.get('/atoken', adminRefreshToken);
router.delete('/alogout', ALogout);

router.get('/users', verifyToken, getUsers);
router.post('/u_user_reg', Register);
router.post('/Login', Login);
router.post('/ForgetPass', ForgetPass);
router.get('/getForgetMail', getForgetMail);
router.get('/getForgetMail1', getForgetMail1);

router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/u_service_details', Form1);
router.post('/u_personal_details', Form3);
router.post('/u_pension_details', Form2);
router.post('/u_contact_details', Form4);
router.post('/u_employment_details', Form5);
router.post('/u_spouse_details', Form6);
router.get('/Form7', Form7);
router.post('/forms', Forms);
router.post('/form7deletes', form7deletes);
router.post('/u_dependent_details',Form8);
router.post('/u_widow_details', WidowForm);
router.get('/clerkUsers', clerkUsers);
router.get('/dep',Dependents);
router.get('/EditForm8',EditForm8);

router.post('/u_status_details', Status);

router.post('/Form7Edit', Form7Edit);
router.post('/Form7Delete', Form7Delete);
router.post('/ULogin', ULogin);


router.get('/TableFilter', TableFilter);
router.get('/TFService', TFService);

router.get('/Users_C', Users_C);
router.get('/Users_S', Users_S);
router.get('/Users_D', Users_D);
router.get('/adminform1', adminform1);
router.get('/adminform2', adminform2);
router.get('/adminform3', adminform3);
router.get('/adminform4', adminform4);
router.get('/adminform5', adminform5);
router.get('/adminform6', adminform6);
router.get('/adminform7', adminform7);
router.get('/awidowform', awidowform);


router.post('/ClerkQ', ClerkQ);
router.post('/SuperintendentQ', SuperintendentQ);
router.post('/DirectorQ', DirectorQ);
router.get('/getClerkQ', getClerkQ);
// router.route('/superForm3', superForm3).get() .post();
router.get('/designation', Designation);
router.post('/recommend', Recommend);
router.post('/approve', Approve);
router.post('/verify', Verify)
router.post('/ESM_No', ESM_No);
router.get('/Prev_ESM', Prev_ESM);
router.get('/ZR', ZR)
//Insert to db(Insert)
router.post('/Single', Single);
router.post('/I_rsb', Rsb);
router.post('/I_zsb', Zsb);
router.post('/I_bank', Bank);
router.post('/I_medicalCategory', MedicalCategory);
router.post('/I_recordoffice', RecordOfficeArmy);
router.post('/I_state', State);
router.post('/I_district', District);
router.post('/I_rank', Rank);

router.post('/I_trade', Trade);
router.post('/I_taluk', Taluk);
//fetch from db(Insert)

router.get('/F_rsb', F_rsb);
router.get('/F_zsb', F_zsb);
router.get('/F_bank', F_bank);
router.get('/F_State', F_State);
router.get('/F_Taluk', F_Taluk);
router.get('/F_Trade', F_Trade);
router.get('/F_District', F_District);
router.get('/F_MedicalCat', F_MedicalCat);
router.get('/F_Rank', F_Rank);
router.get('/F_RecordOfficeArmy', F_RecordOfficeArmy);
router.get('/filter', Filter);
router.get('/reactfilter', ReactFilter);


//dropdown
router.get('/corp_D', Corp_D);
router.get('/record_D', Record_D);
router.get('/rank_D', Rank_D);
router.get('/Rank_Category_D', Rank_Category_D);

router.get('/trade_D', Trade_D);
router.get('/med_D', Med_D);
router.get('/reason_D', Reason_D);
router.get('/char_D', Char_D);
router.get('/bank_D', Bank_D);
router.get('/Branch_Depend', Branch_Depend);
router.get('/IFSC_Depend', IFSC_Depend);
router.get('/dist_D', District_D);
router.get('/District_Depend', District_Depend);
router.get('/state_D', State_D);
router.get('/Taluk_Depend', Taluk_Depend);
router.get('/civil_D', Civil_D);
router.get('/caste_D', Caste_D);
router.get('/religions_D', Religions_D);
router.get('/Service_D', Service_D);
router.get('/getRsb', getRsb);
router.get('/getZsb', getZsb);

router.get('/getUserStatus', getUserStatus);

router.get('/getReg', getReg);

router.get('/getService_Name', getService_Name);

//ImgUpload
// router.post('/Imageupload', Imageupload);
// router.get('/getimg', getimg);

//for image
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
router.post("/uploadImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;

  console.log(Service_No);

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var imgsrc = req.file.filename

        // var insertData = "INSERT INTO u_dependent_details (Relation) VALUES (?)"
         u_file_details.create({
Service_No:Service_No,
                  Img:imgsrc

     });
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/upload_SImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;

  console.log(Service_No);

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var imgsrc = req.file.filename

        // var insertData = "INSERT INTO u_dependent_details (Relation) VALUES (?)"
         u_Sfile_details.create({
Service_No:Service_No,
                  Img:imgsrc

     });
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/upload_DImg", upload.single('Img'), (req, res) => {
  const  Service_No = req.body.Service_No;

  console.log(Service_No);

    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var imgsrc = req.file.filename

        // var insertData = "INSERT INTO u_dependent_details (Relation) VALUES (?)"
         u_Dfile_details.create({
Service_No:Service_No,
Name:Name,
                  Img:imgsrc

     });
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadDischarge_Book", upload.single('Discharge_Book'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       console.log(req.file.filename)
        var iDischarge_Book = 'http://127.0.0.1:5000/images/' + req.file.filename
        //var iPPO = 'http://127.0.0.1:5000/public/images/' + req.file.PPOName
        // var iAdhar = 'http://127.0.0.1:5000/public/images/' + req.file.AdharName
        // var iPAN = 'http://127.0.0.1:5000/public/images/' + req.file.PANName
        // var iECHS = 'http://127.0.0.1:5000/public/images/' + req.file.ECHSName
        // var iVoter = 'http://127.0.0.1:5000/public/images/' + req.file.VoterName

         u_file_details.create({
              Service_No:Service_No,
              Discharge_Book:iDischarge_Book
              //PPO:iPPO
              // Adhar:iAdhar,
              // PAN:iPAN,
              // ECHS:iECHS,
              // Voter:iVoter
     });
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadPPO", upload.single('PPO'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
        // console.log(req.file.filename)
      //  var iDischarge_Book = 'http://127.0.0.1:5000/public/images/' + req.file.Discharge_BookName
        var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
        // var iAdhar = 'http://127.0.0.1:5000/public/images/' + req.file.AdharName
        // var iPAN = 'http://127.0.0.1:5000/public/images/' + req.file.PANName
        // var iECHS = 'http://127.0.0.1:5000/public/images/' + req.file.ECHSName
        // var iVoter = 'http://127.0.0.1:5000/public/images/' + req.file.VoterName

         u_file_details.update({
       PPO:iPPO
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadAdhar", upload.single('Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_file_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadPAN", upload.single('PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadECHS", upload.single('ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadVoter", upload.single('Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_file_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
//spouse upload

router.post("/uploadS_PPO", upload.single('S_PPO'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
        var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Sfile_details.update({
       PPO:iPPO
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadS_Adhar", upload.single('S_Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Sfile_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadS_PAN", upload.single('S_PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadS_ECHS", upload.single('S_ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadS_Voter", upload.single('S_Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Sfile_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
//Dependents upload

router.post("/uploadD_PPO", upload.single('D_PPO'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
        var iPPO = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Dfile_details.update({
       PPO:iPPO
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadD_Adhar", upload.single('D_Adhar'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iAdhar = 'http://127.0.0.1:5000/images/' + req.file.filename
         u_Dfile_details.update({
       Adhar:iAdhar
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadD_PAN", upload.single('D_PAN'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
         var iPAN = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       PAN:iPAN
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadD_ECHS", upload.single('D_ECHS'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iECHS = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       ECHS:iECHS
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});
router.post("/uploadD_Voter", upload.single('D_Voter'), (req, res) => {
  const  Service_No = req.body.Service_No;
  console.log(Service_No);
    if (!req.file) {
        console.log("No file upload");
    } else {
       var iVoter = 'http://127.0.0.1:5000/images/' + req.file.filename

         u_Dfile_details.update({
       Voter:iVoter
 },{
         where:{
           Service_No:Service_No
         }
}
);
        console.log("file uploaded")
        console.log(Service_No);
    }
});



//for img
// //for get img
// router.get("/getimg", (req, res) => {
//   let param = req.query.A_Service_No
//   try {
//       const users =  u_image.findAll({
//           where:{
//               Service_No: param
//           }
//       });
//       console.log(users);
//       res.json(users);
//   } catch (error) {
//       console.log(error);
//   }
// });

// router.get('/fetchImage/:file(*)', (req, res) => {
//     let file = req.params.file;
//     let fileLocation = path.join('./public/images/', file);
//     //res.send({image: fileLocation});
//     res.sendFile(`${fileLocation}`)
// })
router.use('/images', express.static('images'));
// //end of get img


export default router;
