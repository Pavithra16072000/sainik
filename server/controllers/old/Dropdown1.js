
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

import single_values from "../models/Single.js";
import d_record_office_army from "../models/Record_Office_ArmyModel.js";
import d_state from "../models/StateModel.js";
import d_bank from "../models/BankModel.js";
import d_district from "../models/DistrictModel.js";
import d_rank from "../models/RankModel.js";
import d_reg_category from "../models/Reg_CategoryModel.js";
import d_rank_category from "../models/Rank_CategoryModel.js";
import d_reg_type from "../models/Reg_TypeModel.js";
import d_medical_category from "../models/Medical_CategoryModel.js";
import d_rsb from "../models/RsbModel.js";
import d_service from "../models/Service_NameModel.js";
import d_taluk from "../models/TalukModel.js";
import d_trade from "../models/TradeModel.js";
import d_zsb from "../models/ZsbModel.js";
import u_pension_details from "../models/PensionModel.js";
import u_dependent_details from "../models/DependentModel.js";



// %%%%%%%%%%%%%%%%%%%%%%%     Service-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const Service_D = async(req, res) => {
  try {
      const corp = await single_values.findAll({
          attributes:['Value'],
          where:{
            Item: 'Service'
          }

      });
      res.json(corp);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Corp_D = async(req, res) => {
  try {
      const corp = await single_values.findAll({
          attributes:['Value'],
          where:{
            Item: 'Corps Name'
          }

      });
      res.json(corp);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Record_D = async(req, res) => {
  try {
      const record = await d_record_office_army.findAll({
          attributes:['Record_Office_Name']

      });
      res.json(record);
  } catch (error) {
      console.log(error);
  }
}






// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name -->Create  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// export const Register = async(req, res) => {
//     const { Name, Service_No, Mobile, Mail_Id, Password, ConfPassword, Reg_Date,Status} = req.body;
//     if(Password !== ConfPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
//   //  const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         await u_user_reg.create({
//             Name: Name,
//             Service_No:Service_No,
//             Mobile:Mobile,
//             Mail_Id: Mail_Id,
//             Password: hashPassword,
//             Reg_Date: Reg_Date,
//             Status: Status,
//         });
//         res.json({msg: "Registration Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }


// %%%%%%%%%%%%%%%%%%%%%%%%     Record_Office_Name-->Create  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     Rank-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Rank_D = async(req, res) => {
  try {
      const rank = await d_rank.findAll({
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
      const trade = await d_trade.findAll({
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
      const medicals = await d_medical_category.findAll({
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
      const characters = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Discharge Character'
          }

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
      const banks = await d_bank.findAll({
          attributes:['Bank_Name']

      });
      res.json(banks);
  } catch (error) {
      console.log(error);
  }
}



export const Bankk = async(req, res) => {
    const {Bank_Name, Branch, IFSC } = req.body;
    try {
        await d_bank.create({
            Bank_Name: Bank_Name,
            Branch:Branch,
            IFSC:IFSC

        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}






// %%%%%%%%%%%%%%%%%%%%%%%%     Bank-->Drop_Down                   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Branch_D = async(req, res) => {
  try {
      const branchs = await d_bank.findAll({
          attributes:['Branch']

      });
      res.json(branchs);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Bank_Branch-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     IFSC-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Ifscs_D = async(req, res) => {
  try {
      const ifscs = await d_bank.findAll({
          attributes:['IFSC']

      });
      res.json(ifscs);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     IFSC-->Drop_Down            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Civil_D = async(req, res) => {
  try {
      const civil = await single_values.findAll({
          attributes:['Value'],
          where:{
              Item: 'Civil Qualification'
          }

      });
      res.json(civil);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Civil_Qualification-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 export const Reason_D = async(req, res) => {
  try {
      const reason = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Discharge Reason'
          }

      });
      res.json(reason);
  } catch (error) {
      console.log(error);
  }
}
// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Caste_D = async(req, res) => {
  try {
      const caste = await single_values.findAll({
         attributes:['Value'],
          where:{
              Item: 'Caste'
          }

      });
      res.json(caste);
  } catch (error) {
      console.log(error);
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Religion-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Religions_D = async(req, res) => {
  try {
      const religions = await single_values.findAll({
        attributes:['Value'],
          where:{
              Item: 'Religion'
          }

      });
      res.json(religions);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Religion-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// export const Place_D = async(req, res) => {
//   try {
//       const places = await u_personal_details.findAll({
//           attributes:['Place']

//       });
//       res.json(places);
//   } catch (error) {
//       console.log(error);
//   }
// }

// %%%%%%%%%%%%%%%%%%%%%%%%     Birth_Place-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const State_D = async(req, res) => {
  try {
      const states = await d_state.findAll({
          attributes:['State']

      });
      res.json(states);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     State-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// %%%%%%%%%%%%%%%%%%%%%%%%    District-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const District_D = async(req, res) => {
  try {
      const dist = await d_district.findAll({
//           attributes:['District'],
// distinct: true
         attributes:[
         [Sequelize.fn('DISTINCT', Sequelize.col('District')) ,'District'],
]

      });
      res.json(dist);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     District-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const District_Depend = async(req, res) => {

    let param=req.query.state
        try {
          const name =await d_state.findOne({
          attributes:['State_Surname'],
           where:{
               State: param
           }
        });
        console.log(name.toJSON());
        const n=name.toJSON()
        const State_Surname= n.State_Surname;
            const dist=await d_district.findAll({
              //           attributes:['District'],
              // distinct: true,
              attributes:[
              [Sequelize.fn('DISTINCT', Sequelize.col('District')) ,'District'],
     ],

                where:{
                State_Surname:State_Surname
              }
            });
            res.json(dist);
        } catch (error) {
            console.log(error);
        }
}
// %%%%%%%%%%%%%%%%%%%%%%%%     Taluk-->Drop_Down     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Taluk_D = async(req, res) => {
  try {
      const taluks = await d_taluk.findAll({
          attributes:['Taluk_Name']

      });
      res.json(taluks);
  } catch (error) {
      console.log(error);
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%     Taluk-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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

// %%%%%%%%%%%%%%%%%%%%%%%%%%        rsb        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getRsb = async(req, res) => {
    try {
        const rsb_name = await d_rsb.findAll({
            attributes:['RSB_Name']
        });
        res.json(rsb_name);
    } catch (error) {
        console.log(error);
    }
}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%        zsb     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getZsb = async(req, res) => {
    try {
        const zsb_name = await d_zsb.findAll({
            attributes:['ZSB_Name']
        });
        res.json(zsb_name);
    } catch (error) {
        console.log(error);
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%        Insert a file     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
