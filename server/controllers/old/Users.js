// const { Op } = require("sequelize");
import { Sequelize } from "sequelize";
import path from "path";

const Op = Sequelize.Op;
import MyUsers from "../models/UserModel.js";
import u_service_details from "../models/ServiceModel.js";
import u_contact_details from "../models/ContactModel.js";
import u_employment_details from "../models/EmploymentModel.js";
import u_spouse_details from "../models/SpouseModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_widow_details from "../models/WidowModel.js";
import u_pension_details from "../models/PensionModel.js";
import u_personal_details from "../models/PersonalModel.js";
import u_status_details from "../models/StatusModel.js";
import u_image from "../models/ImageModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => { //dashboard
    try {
        const users = await MyUsers.findAll({
            attributes:['id','Name','Service_No','Mail_Id']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { Name, Service_No, Mobile, Mail_Id, Password, confPassword, Reg_Date,Status} = req.body;
    if(Password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(Password, salt);
    try {
        await MyUsers.create({
            Name: Name,
            Service_No:Service_No,
            Mobile:Mobile,
            Mail_Id: Mail_Id,
            Password: hashPassword,
            Reg_Date: Reg_Date,
            Status: Status,
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await MyUsers.findAll({
            where:{
                Service_No: req.body.Service_No
            }
        });
        const match = await bcrypt.compare(req.body.Password, user[0].Password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].Name;
        const service_no = user[0].Service_no;
        const accessToken = jwt.sign({userId, name, service_no}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, service_no}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await MyUsers.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Service Number not found"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await MyUsers.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await MyUsers.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form1            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form1 = async(req, res) => {
    const { Service_No, Reg_Type, Service_Name, Corps_Name,Record_Office_Name,Group_Name, Trade_Name, Rank_Name, Name, Gender, DOB, Enroll_Date, World_War2, Opt_Attend ,Deco } = req.body;

    try {
      const Service_Id = await single_values.findAll({
          attributes:['id'],
          where:{
            Item:Service_Name
          }
      });
        await u_service_details.create({

            Service_No:Service_No,
            Reg_Type:Reg_Type,
            Service_Name: Service_Id,
            Corps_Name: Corps_Name,
            Record_Office_Name: Record_Office_Name,
            Group_Name:Group_Name,
            Trade_Name: Trade_Name,
            Rank_Name:Rank_Name,
            Name: Name,
            Gender: Gender,
            DOB: DOB,
            Enroll_Date: Enroll_Date,
            World_War2: World_War2,
            Opt_Attend: Opt_Attend,
            Deco: Deco
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form1            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Form2 = async(req, res) => {
    const { Service_No, Unit_Last_Served, Discharge_Date, Discharge_Reason,Discharge_Med_Cat,Discharge_Character, Discharge_Book_No, If_Pensioner, PPO_No,Pension_Sanctioned, Present_Pension, Enroll_Date, If_Sanctioned_Dis_Pension, Disability_Pension,Disability_Percentage, Pension_AC_No, Bank_Name, Branch,IFSC } = req.body;

    try {
        await u_pension_details.create({

            Service_No:Service_No,
            Unit_Last_Served:Unit_Last_Served,
            Discharge_Date: Discharge_Date,
            Discharge_Reason: Discharge_Reason,
            Discharge_Med_Cat: Discharge_Med_Cat,
            Discharge_Character:Discharge_Character,
            Discharge_Book_No: Discharge_Book_No,
            If_Pensioner:If_Pensioner,
            PPO_No: PPO_No,
            Pension_Sanctioned: Pension_Sanctioned,
            Present_Pension: Present_Pension,
            Enroll_Date: Enroll_Date,
            If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
            Disability_Pension: Disability_Pension,
            Disability_Percentage: Disability_Percentage,
            Pension_AC_No: Pension_AC_No,
            Bank_Name: Bank_Name,
            Branch: Branch,
            IFSC:IFSC
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Form3 = async(req, res) => {
    const { Service_No, Father_Name, Mother_Name, Religion, Caste_Category,Birth_Dist_Surname, Birth_Place, Adhaar, Voter_Id,PAN, CSD, ECHS, Id_Mark1,Id_Mark2 } = req.body;

    try {
        await u_personal_details.create({

            Service_No:Service_No,
            Father_Name:Father_Name,
            Mother_Name: Mother_Name,
            Religion: Religion,
            Caste_Category: Caste_Category,
            Birth_Dist_Surname:Birth_Dist_Surname,
            Birth_Place: Birth_Place,
            Adhaar:Adhaar,
            Voter_Id: Voter_Id,
            PAN: PAN,
            CSD: CSD,
            ECHS: ECHS,
            Id_Mark1: Id_Mark1,
            Id_Mark2: Id_Mark2
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Form4 = async(req, res) => {
    const { Service_No, House_No , House_Name, Street,Pincode,Police_Station, Tele_No, P_House_No, P_House_Name,P_Street, P_Pincode, P_Police_Station } = req.body;

    try {
        await u_conatact_details.create({

            Service_No:Service_No,
            House_No:House_No,
            House_No: House_No,
            House_Name: House_Name,
            Street: Street,
            Pincode:Pincode,
            Pincode: Pincode,
            Police_Station:Police_Station,
            Tele_No: Tele_No,
            P_House_No: P_House_No,
            P_House_Name: P_House_Name,
            P_Street: P_Street,
            P_Pincode: P_Pincode,
            P_Police_Station: P_Police_Station

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Form5 = async(req, res) => {
    const { Service_No, Civil_Qualification, Addi_Course, Equi_Test,Civil_Emp_Status,Dept, Pres_Desg, Employer, Month_Income,Official_No, Desg_Retire, Retire_Date, Civil_PPO_No } = req.body;

    try {
        await u_employment_details.create({

            Service_No:Service_No,
            Civil_Qualification :Civil_Qualification,
            Addi_Course: Addi_Course,
            Equi_Test:Equi_Test,
            Civil_Emp_Status: Civil_Emp_Status,
            Dept:Dept,
            Pres_Desg: Pres_Desg,
            Employer:Employer,
            Month_Income: Month_Income,
            Official_No: Official_No,
            Desg_Retire: Desg_Retire,
            Retire_Date: Retire_Date,
            Civil_PPO_No: Civil_PPO_No
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form5          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form6            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Form6 = async(req, res) => {
    const { Service_No, Marital_Status, Marriage_Date, Spouse_Name,Spouse_Relation,Spouse_DOB, Spouse_Id_Mark, Spouse_Qualification, Spouse_Emp_Status,Spouse_Emp_Profession,Spouse_Retirement_Date, Spouse_Adhaar, Spouse_Voter_Id,Spouse_PAN,Spouse_CSD,Spouse_ECHS } = req.body;

    try {
        await u_spouse_details.create({

            Service_No:Service_No,
            Marital_Status :Marital_Status,
            Marriage_Date: Marriage_Date,
            Spouse_Name:Spouse_Name,
            Spouse_Relation: Spouse_Relation,
            Spouse_DOB:Spouse_DOB,
            Spouse_Id_Mark: Spouse_Id_Mark,
            Spouse_Qualification:Spouse_Qualification,
            Spouse_Emp_Status: Spouse_Emp_Status,
            Spouse_Emp_Profession: Spouse_Emp_Profession,
            Spouse_Retirement_Date: Spouse_Retirement_Date,
            Spouse_Adhaar: Spouse_Adhaar,
            Spouse_Voter_Id: Spouse_Voter_Id,
            Spouse_PAN:Spouse_PAN,
            Spouse_CSD:Spouse_CSD,
            Spouse_ECHS:Spouse_ECHS
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form6          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7           %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const Form7 = async(req, res) => {
//     const { Service_No, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;
//
//     try {
//         await u_dependent_details.create({
//
//             Service_No:Service_No,
//             Dep_Name :Dep_Name,
//             Relation: Relation,
//             Dep_DOB:Dep_DOB,
//             Dep_Adhaar: Dep_Adhaar,
//             Dep_Qualification:Dep_Qualification,
//             Dep_Academic_Yr: Dep_Academic_Yr,
//             Dep_Employment_Status:Dep_Employment_Status,
//             Dep_Marital_Status: Dep_Marital_Status
//         });
//         res.json({msg: "Registration Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Form7 = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_dependent_details.findAll({
            where:{
            Service_No:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form7          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form8         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const Form8 = async(req, res) => {
     const { Service_No, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.create({

             Service_No:Service_No,
            Dep_Name :Dep_Name,
            Relation: Relation,
            Dep_DOB:Dep_DOB,
            Dep_Adhaar: Dep_Adhaar,
            Dep_Qualification:Dep_Qualification,
            Dep_Academic_Yr: Dep_Academic_Yr,
            Dep_Employment_Status:Dep_Employment_Status,
            Dep_Marital_Status: Dep_Marital_Status
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Form8          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const form8dep = async(req, res) => {
let param=req.query.D_Service_No
    try {
        const dep=await u_dependent_details.findAll({
            where:{
            Dep_Name:param
          }
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}
export const Form7Edit = async(req, res) => {
     const { Service_No,checkDep_Name, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_dependent_details.update({
            Service_No:Service_No,
            Dep_Name :Dep_Name,
            Relation: Relation,
            Dep_DOB:Dep_DOB,
            Dep_Adhaar: Dep_Adhaar,
            Dep_Qualification:Dep_Qualification,
            Dep_Academic_Yr: Dep_Academic_Yr,
            Dep_Employment_Status:Dep_Employment_Status,
            Dep_Marital_Status: Dep_Marital_Status
          },{
            where:{
              // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
              Service_No:Service_No,
              Dep_Name :checkDep_Name
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Form7Delete = async(req, res) => {
     const { Service_No,checkDep_Name } = req.body;

    try {
        await u_dependent_details.destroy({

            where:{
              // [Op.and] :[{Service_No:Service_No},{  Dep_Name :Dep_Name}]
              Service_No:Service_No,
              Dep_Name :checkDep_Name
            }
}
 );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}



//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Forms[1-8]         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


export const Forms = async(req, res) => {
    const { Service_No, Service_Name, Corps_Name,Record_Office_Name,Group_Name, Trade_Name, Rank_Name, Name, Gender, DOB, Enroll_Date, World_War2, Opt_Attend ,Deco } = req.body;
    const { Unit_Last_Served, Discharge_Date, Discharge_Reason,Discharge_Med_Cat,Discharge_Character, Discharge_Book_No, If_Pensioner, PPO_No,Pension_Sanctioned, Present_Pension, If_Sanctioned_Dis_Pension, Disability_Pension,Disability_Percentage, Pension_AC_No, Bank_Name, Branch,IFSC } = req.body;
    const { Father_Name, Mother_Name, Religion, Caste_Category,Birth_Dist_Surname, Birth_Place, Adhaar, Voter_Id,PAN, CSD, ECHS, Id_Mark1,Id_Mark2 } = req.body;
    const { House_No , House_Name, Street,Pincode,Police_Station, Tele_No, P_House_No, P_House_Name,P_Street, P_Pincode, P_Police_Station } = req.body;
    const { Civil_Qualification, Addi_Course, Equi_Test,Civil_Emp_Status,Dept, Pres_Desg, Employer, Month_Income,Official_No, Desg_Retire, Retire_Date, Civil_PPO_No } = req.body;
    const { Marital_Status, Marriage_Date, Spouse_Name,Spouse_Relation,Spouse_DOB, Spouse_Id_Mark, Spouse_Qualification, Spouse_Emp_Status,Spouse_Emp_Profession,Spouse_Retirement_Date, Spouse_Adhaar, Spouse_Voter_Id,Spouse_PAN,Spouse_CSD,Spouse_ECHS } = req.body;
    const {  Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;

    try {
        await u_service_details.create({

            Service_No:Service_No,
            Service_Name: Service_Name,
            Corps_Name: Corps_Name,
            Record_Office_Name: Record_Office_Name,
            Group_Name:Group_Name,
            Trade_Name: Trade_Name,
            Rank_Name:Rank_Name,
            Name: Name,
            Gender: Gender,
            DOB: DOB,
            Enroll_Date: Enroll_Date,
            World_War2: World_War2,
            Opt_Attend: Opt_Attend,
            Deco: Deco
        });


 await u_pension_details.create({

            Service_No:Service_No,
            Unit_Last_Served:Unit_Last_Served,
            Discharge_Date: Discharge_Date,
            Discharge_Reason: Discharge_Reason,
            Discharge_Med_Cat: Discharge_Med_Cat,
            Discharge_Character:Discharge_Character,
            Discharge_Book_No: Discharge_Book_No,
            If_Pensioner:If_Pensioner,
            PPO_No: PPO_No,
            Pension_Sanctioned: Pension_Sanctioned,
            Present_Pension: Present_Pension,
            Enroll_Date: Enroll_Date,
            If_Sanctioned_Dis_Pension: If_Sanctioned_Dis_Pension,
            Disability_Pension: Disability_Pension,
            Disability_Percentage: Disability_Percentage,
            Pension_AC_No: Pension_AC_No,
            Bank_Name: Bank_Name,
            Branch: Branch,
            IFSC:IFSC
        });


  await u_personal_details.create({

            Service_No:Service_No,
            Father_Name:Father_Name,
            Mother_Name: Mother_Name,
            Religion: Religion,
            Caste_Category: Caste_Category,
            Birth_Dist_Surname:Birth_Dist_Surname,
            Birth_Place: Birth_Place,
            Adhaar:Adhaar,
            Voter_Id: Voter_Id,
            PAN: PAN,
            CSD: CSD,
            ECHS: ECHS,
            Id_Mark1: Id_Mark1,
            Id_Mark2: Id_Mark2
        });


  await u_contact_details.create({

            Service_No:Service_No,
            House_No:House_No,
            House_No: House_No,
            House_Name: House_Name,
            Street: Street,
            Pincode:Pincode,
            Pincode: Pincode,
            Police_Station:Police_Station,
            Tele_No: Tele_No,
            P_House_No: P_House_No,
            P_House_Name: P_House_Name,
            P_Street: P_Street,
            P_Pincode: P_Pincode,
            P_Police_Station: P_Police_Station

        });


 await u_employment_details.create({

            Service_No:Service_No,
            Civil_Qualification :Civil_Qualification,
            Addi_Course: Addi_Course,
            Equi_Test:Equi_Test,
            Civil_Emp_Status: Civil_Emp_Status,
            Dept:Dept,
            Pres_Desg: Pres_Desg,
            Employer:Employer,
            Month_Income: Month_Income,
            Official_No: Official_No,
            Desg_Retire: Desg_Retire,
            Retire_Date: Retire_Date,
            Civil_PPO_No: Civil_PPO_No
        });


await u_spouse_details.create({

            Service_No:Service_No,
            Marital_Status :Marital_Status,
            Marriage_Date: Marriage_Date,
            Spouse_Name:Spouse_Name,
            Spouse_Relation: Spouse_Relation,
            Spouse_DOB:Spouse_DOB,
            Spouse_Id_Mark: Spouse_Id_Mark,
            Spouse_Qualification:Spouse_Qualification,
            Spouse_Emp_Status: Spouse_Emp_Status,
            Spouse_Emp_Profession: Spouse_Emp_Profession,
            Spouse_Retirement_Date: Spouse_Retirement_Date,
            Spouse_Adhaar: Spouse_Adhaar,
            Spouse_Voter_Id: Spouse_Voter_Id,
            Spouse_PAN:Spouse_PAN,
            Spouse_CSD:Spouse_CSD,
            Spouse_ECHS:Spouse_ECHS
        });


 // await u_dependent_details.create({
 //
 //             Service_No:Service_No,
 //            Dep_Name :Dep_Name,
 //            Relation: Relation,
 //            Dep_DOB:Dep_DOB,
 //            Dep_Adhaar: Dep_Adhaar,
 //            Dep_Qualification:Dep_Qualification,
 //            Dep_Academic_Yr: Dep_Academic_Yr,
 //            Dep_Employment_Status:Dep_Employment_Status,
 //            Dep_Marital_Status: Dep_Marital_Status
 //        });

       // res.json({msg: "Registration Successful"});
       console.log('inserted');

    } catch (error) {
        console.log(error);
    }

}

//   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       WidowForm          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const WidowForm = async(req, res) => {
    const { Service_No, Widow_Reg_No, Family_Pension, W_Nxt_Kin,Death_Date,Death_Nature, ESM_No} = req.body;

    try {
        await u_widow_details.create({

            Service_No:Service_No,
            Widow_Reg_No :Widow_Reg_No,
            Family_Pension: Family_Pension,
            W_Nxt_Kin:W_Nxt_Kin,
            Death_Date: Death_Date,
            Death_Nature:Death_Nature,
            ESM_No: ESM_No

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const superForm1 = async(req, res) => {
  try {
      const users = await u_service_details.findAll({
          attributes:['Service_No','Reg_Type','Service_Name','Corps_Name','Record_Office_Name','Group_Name', 'Trade_Name', 'Rank_Name', 'Name', 'Gender', 'DOB', 'Enroll_Date', 'World_War2', 'Opt_Attend' ,'Deco'],
          where:{
              Service_No: "p98765k"
          }
      });
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const superForm3 = async(req, res) => {
  let param = req.query.A_Service_No
  try {
      const users = await u_service_details.findAll({
          attributes:['Service_No','Reg_Type','Service_Name','Corps_Name','Record_Office_Name','Group_Name', 'Trade_Name', 'Rank_Name', 'Name', 'Gender', 'DOB', 'Enroll_Date', 'World_War2', 'Opt_Attend' ,'Deco'],
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
// dependent
export const getdep = async(req, res) => {
    try {
        const dep = await u_dependent_details.findAll();
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Corp_D = async(req, res) => {
  try {
      const crop = await u_service_details.findAll({
          attributes:['Corps_Name']

      });
      res.json(crop);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Record_D = async(req, res) => {
  try {
      const record = await u_service_details.findAll({
          attributes:['Record_Office_Name']

      });
      res.json(record);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Rank_D = async(req, res) => {
  try {
      const rank = await u_service_details.findAll({
          attributes:['Rank_Name']

      });
      res.json(rank);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Trade_D = async(req, res) => {
  try {
      const trade = await u_service_details.findAll({
          attributes:['Trade_Name']

      });
      res.json(trade);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Trade-->Drop_Down                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Medical_Cat-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Med_D = async(req, res) => {
  try {
      const medicals = await u_pension_details.findAll({
          attributes:['Discharge_Med_Cat']

      });
      res.json(medicals);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Medical_Cat-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Discharge_Character-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Char_D = async(req, res) => {
  try {
      const characters = await u_pension_details.findAll({
          attributes:['Discharge_Character']

      });
      res.json(characters);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%      Discharge_Character-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Bank_D = async(req, res) => {
  try {
      const banks = await u_pension_details.findAll({
          attributes:['Bank_Name']

      });
      res.json(banks);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Branch_D = async(req, res) => {
  try {
      const branchs = await u_pension_details.findAll({
          attributes:['Branch']

      });
      res.json(branchs);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Civil_D = async(req, res) => {
  try {
      const civil = await u_employment_details.findAll({
          attributes:['Civil_Qualification']

      });
      res.json(civil);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Caste_D = async(req, res) => {
  try {
      const caste = await u_personal_details.findAll({
          attributes:['Caste_Category']

      });
      res.json(caste);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const BirthDist_D = async(req, res) => {
  try {
      const birth_dist = await u_personal_details.findAll({
          attributes:['Birth_Dist_Surname']

      });
      res.json(birth_dist);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const BirthPlace_D = async(req, res) => {
  try {
      const birth_places = await u_personal_details.findAll({
          attributes:['Birth_Place']

      });
      res.json(birth_places);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




//%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Dependents = async(req, res) => {
    try {
        const dep = await u_dependent_details.findAll({
            attributes:['Service_No','Dep_Name','Relation','Dep_DOB','Dep_Adhaar','Dep_Qualification','Dep_Academic_Yr','Dep_Employment_Status','Dep_Marital_Status','Dep_DOB']
        });
        res.json(dep);
    } catch (error) {
        console.log(error);
    }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%  %  Dependent Dashboard   % %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getFile = async(req, res) => {

  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });

}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Imageupload= async(req, res) => {

    try {
//const __dirname = path.resolve();
    //   const {  Imagee } = req.body;
    //   const filePath = path.join(__dirname,'..','public','image')

       const file = req.file.file


 await u_image.create({

           Image:file

        });

    } catch (error) {
        console.log(error);
    }

}
//for get img
// export const getimg= async (req, res) => {
//   let param = req.query.A_Service_No
//   try {
//       const u =  await u_image.findOne({
//         attributes:['Image'],
//           where:{
//               Service_No: param
//           },
//           responseType:'blob'
//       });
//       const n=u.toJSON()
//             // const RSB_Id= name.toJSON({RSB_Id});
//             const users= n.Image;
//
//       console.log(users);
//       res.json(users);
//   } catch (error) {
//       console.log(error);
//   }
// }
export const getimg= async (req, res) => {
  let param = req.query.A_Service_No
  try {
      const u =  await u_dependent_details.findOne({
        attributes:['Relation'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.Relation;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

//end of get img
export const getForgetMail= async (req, res) => {
  let param = req.query.Service_No
  try {
      const u =  await MyUsers.findOne({
        attributes:['Mail_Id'],
          where:{
              Service_No: param
          }
        //  responseType:'blob'
      });
      const n=u.toJSON()
            // const RSB_Id= name.toJSON({RSB_Id});
            const users= n.Mail_Id;

      console.log(users);
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

export const capt = async(req, res) => {

try {
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
    var a= alpha[Math.floor(Math.random()*62)];
    var b= alpha[Math.floor(Math.random()*62)];
    var c= alpha[Math.floor(Math.random()*62)];
    var d= alpha[Math.floor(Math.random()*62)];
    var e= alpha[Math.floor(Math.random()*62)];
    var f= alpha[Math.floor(Math.random()*62)];

    var sum = a+b+c+d+e+f;

      res.json(sum);
      console.log(sum)
  } catch (error) {
      console.log(error);
  }
}
export const ForgetPass = async(req, res) => {
    const { Service_No, Password, ConfPassword} = req.body;


    if(Password !== ConfPassword)
    return res.status(400).json({msg: "Password and Confirm Password do not match"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(Password, salt);
    try {
        await u_user_reg.update({

            Password: hashPassword},
            {

                where:{ Service_No:Service_No}
}

        );
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
