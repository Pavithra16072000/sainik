import Admin from "../models/AdminModel.js";
import MyUsers from "../models/UserModel.js";
import db from "../config/Database.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

import mysql2 from 'mysql2';
import u_status_details from "../models/StatusModel.js";
import single_values from "../models/Single.js";
import u_pension_details from "../models/PensionModel.js";
import u_service_details from "../models/ServiceModel.js";
import u_contact_details from "../models/ContactModel.js";
import u_employment_details from "../models/EmploymentModel.js";
import u_spouse_details from "../models/SpouseModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_widow_details from "../models/WidowModel.js";
import u_personal_details from "../models/PersonalModel.js";
import u_file_details from "../models/FileModel.js";
import u_sfile_details from "../models/SpouseFileModel.js";
import u_dfile_details from "../models/DependentFileModel.js";
import u_esm from "../models/ESM_No.js";
import d_zsb from "../models/ZsbModel.js";
import d_rsb from "../models/RsbModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAdmin = async(req, res) => { //dashboard
    try {
        const admin = await Admin.findAll({
            attributes:['id','name','designation','service_no','email']
        });
        res.json(admin);
    } catch (error) {
        console.log(error);
    }
}

export const ARegister = async(req, res) => {
    const { name, email, service_no,board, board_name,designation, mobile, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Admin.create({
            name: name,
            service_no:service_no,
            board:board,
            board_name:board_name,
            designation:designation,
            email: email,
            mobile:mobile,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const ALogin = async(req, res) => {
    try {
        const user = await Admin.findAll({
            where:{
                service_no: req.body.service_no
            }
        });
        // const dmatch = await compare(req.body.designation, user[0].designation);
        // if(!dmatch) return res.status(400).json({msg: "Wrong designation"});

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const service_no = user[0].service_no;
        const designation = user[0].designation;
        const accessToken = jwt.sign({userId, name, service_no,designation}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, service_no,designation}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Admin.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
        // res.json({designation: designation});

    } catch (error) {
        res.status(404).json({msg:"Service Number not found"});
    }
}

export const Users_C = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            // attributes:['id','Service_No','Name','Clerk','Superindendent','Director'],
            where:{
                Board_Name: A_Board,
                Clerk: {
                      [Op.or]: ['Pending','Observation']
                    }
            }
            // where:{
            //     Status: {
            //       [Op.ne]: 'Not Submitted'
            //     }
            // }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const Users_S = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Superintendent: {
                      [Op.or]: ['Pending','Observation']
                    }
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const Users_D = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await u_status_details.findAll({
            where:{
                Board_Name: A_Board,
                Director: {
                      [Op.or]: ['Pending','Observation']
                    }
            }
        });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// to get admins designation
export const Designation = async(req, res) => {
  let param = req.query.ALogin_S
  try {
      const u = await Admin.findOne({
          attributes:['Name','Designation'],
          where:{
              Service_No: param
          }
      });
      const n=u.toJSON()
            const name= n.Name;
const des=n.Designation
const users=[name,des]
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const ALogout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Admin.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Admin.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
export const Status = async(req, res) => { //status
  const { Service_No, Name } = req.body;

  try {
      await u_status_details.create({

          Service_No:Service_No,
          Name:Name
      });
      res.json({msg: "Successful"});
  } catch (error) {
      console.log(error);
  }
}
// single
export const Single = async(req, res) => {
    const {Item, Value } = req.body;
    try {
        await single_values.create({
            Item: Item,
            Value:Value

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//ClerkQ
export const ClerkQ = async(req, res) => {
    const { ClerkQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            C_Remark:ClerkQ,
            Clerk:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const SuperintendentQ = async(req, res) => {
    const { SuperintendentQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            S_Remark:SuperintendentQ,
            Superindendent:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const DirectorQ = async(req, res) => {
    const { DirectorQ,Service_No } = req.body;

    try {
        await u_status_details.update({

            D_Remark:DirectorQ,
            Director:"Observation"},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Verify = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Clerk:"Verified"},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "verified"});
    } catch (error) {
        console.log(error);
    }
}
export const Recommend = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Superindendent:"Recommended"},{
            where:{
                Service_No: Service_No
            }


        });
        res.json({msg: "Recommended "});
    } catch (error) {
        console.log(error);
    }
}

export const Approve = async(req, res) => {
    const { Service_No } = req.body;

    try {
        await u_status_details.update({

            Director:"Approved"},{
            where:{
                Service_No: Service_No
            }

        });
        res.json({msg: "Approve"});
    } catch (error) {
        console.log(error);
    }
}

export const getClerkQ = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_status_details.findAll({
          attributes:['C_Remark','S_Remark','D_Remark'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get adminform1

export const adminform1 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_service_details.findAll({
          where:{
              Service_No: param
          }
      });
      // const n=users.toJSON()
      //     const service_Id= n.Service_Name;
      //
      // const s = await single_values.findAll({
      //     where:{
      //         Id: service_Id
      //     }
      // });
      // console.log(s);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const adminform_s =async(req, res) => {
  let param = req.query.A_Service_No
  try {

    const [s, metadata] = await db.query("SELECT * FROM test5_view ");
    res.json(s);

console.log(s);
  } catch (error) {
      console.log(error);
  }
}

// let connection = mysql2.createConnection(db);
//
// let sql = `SELECT * FROM todos`;
// connection.query(sql, (error, results, fields) => {
//   if (error) {
//     return console.error(error.message);
//   }
//   console.log(results);
// });
//
// connection.end();
// const [adminform_s, metadata] = await sequelize.query("SELECT * FROM test_view");
// to get adminform2

export const adminform2 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_pension_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}



// to get adminform3

export const adminform3 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_personal_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


// to get adminform4

export const adminform4 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_contact_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


// to get adminform5

export const adminform5 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_employment_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get adminform6

export const adminform6 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_spouse_details.findAll({
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get adminform7

export const adminform7 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_dependent_details.findAll({
          // attributes:['Service_No','Name','Dep_Name','Relation','Dep_DOB','Dep_Adhaar', 'Dep_Qualification', 'Dep_Academic_Yr', 'Dep_Employment_Status', 'Dep_Marital_Status'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

// to get widowform

export const awidowform = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_widow_details.findAll({
          attributes:['Service_No','Widow_Reg_No','Family_Pension','W_Nxt_Kin','Death_Date','Death_Nature', 'ESM_No'],
          where:{
              Service_No: param
          }
      });
      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}


export const TableFilter = async(req, res) => {
    try {
        const users=await u_form_details.findAll({

        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
export const AdminFormDoc = async(req, res) => {
  let param = req.query.A_Service_No
    try {
        const name=await u_file_details.findOne({
where:{
    Service_No: param
}
        });
        const n=name.toJSON()
        const users= [n.service_no,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS,n.Discharge_Book];

        res.json(users);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}
export const Prev_ESM = async(req, res) => {
    try {
        const name=await u_esm.findOne({
          attributes: [[Sequelize.fn('max', Sequelize.col('id')),'maxID']]
        });
        console.log(name);
        const n=name.toJSON()
        const id= n.maxID;
        const name1=await u_esm.findOne({
          where:{
            id:id
          }
        });
        const n1=name1.toJSON()
        const sn= n1.Service_No;
        res.json(sn);
        console.log(sn);
    } catch (error) {
        console.log(error);
    }
}

export const ESM_No = async(req, res) => {
  // let param = req.query.Service_No
  // let param1 = req.query.ESM_No
  const { Service_No, ESM_No} = req.body;

      try {
        await u_esm.create({

            Service_No:Service_No,
            ESM_No:ESM_No,

        });
        // console.log(param);
        res.json({msg: "Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const ZR = async(req, res) => { //dashboard
  let param = req.query.ALogin_S

    try {
      const AB = await Admin.findOne({
          attributes:['board_name'],
          where:{
              Service_No: param
          }
      });
      const n=AB.toJSON()
            const A_Board= n.board_name;

      console.log(A_Board);
        const users = await d_zsb.findOne({
            where:{
                ZSB_Name: A_Board,
            }

        });
        const u=users.toJSON()
        const id= u.ZSB_RSB_ID;
        const RSB_Id= u.RSB_Id;
        const users1 = await d_rsb.findOne({
            where:{
                RSB_Id: RSB_Id,
            }
      });
      const u1=users1.toJSON()
      const RSB_Surname= u1.RSB_Surname;
      const ids=[RSB_Surname,id]
      console.log(ids);
      res.json(ids);

    } catch (error) {
        console.log(error);
    }
}

// export const AdminFormDoc = async(req, res) => {
//   let param = req.query.A_Service_No
//     try {
//         const name=await u_file_details.findOne({
//           attributes:['Adhar'],
//
// where:{
//     Service_No: param
// }
//         });
//         const n=name.toJSON()
//               // const RSB_Id= name.toJSON({RSB_Id});
//               const users= n.Adhar;
//
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }



// export const AS_DocForm = async(req, res) => {
//   let param = req.query.A_Service_No
//     try {
//         const name=await u_sfile_details.findOne({
// where:{
//     Service_No: param
// }
//         });
//         const n=name.toJSON()
//         const users= [n.service_no,n.Adhar,n.Voter,n.PAN,n.PPO,n.ECHS];
//
//         res.json(users);
//         console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const AD_DocForm = async(req, res) => {
//   let param = req.query.A_Service_No
//   let name=req.query.A_DName
//     try {
//         const name=await u_dfile_details.findOne({
// where:{
//     Service_No: param,
//     Name:name
// }
//         });
//         const n=name.toJSON()
//         const users= [n.service_no,n.Adhar,n.Voter,n.PAN,n.ECHS];
//
//         res.json(users);
//         console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
