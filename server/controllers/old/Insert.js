import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import bcrypt from 'bcrypt'
import single_values from "../models/Single.js";
import d_rsb from "../models/RsbModel.js";
import d_zsb from "../models/ZsbModel.js";
import d_bank from "../models/BankModel.js";
import d_district from "../models/DistrictModel.js";
import d_medical_category from "../models/Medical_CategoryModel.js";
import d_record_office_army from "../models/Record_Office_ArmyModel.js";
import d_state from "../models/StateModel.js";
import d_taluk from "../models/TalukModel.js";
import d_trade from "../models/TradeModel.js";
import d_rank from "../models/RankModel.js";

import u_service_details from "../models/ServiceModel.js";
import u_personal_details from "../models/PersonalModel.js";


// export const Rsb = async(req, res) => {
//     const {RSB_Name,RSB_Surname } = req.body;
//     try {
//         await d_rsb.create({
//           // RSB_Id: RSB_Id,
//           RSB_Name:RSB_Name,
//           RSB_Surname:RSB_Surname
//
//         });
//         res.json({msg: "Insert Successful"});
//     } catch (error) {
//         console.log(error);
//     }
// }
//

export const Rsb = async(req, res) => {
    const {RSB_Name,RSB_Surname} = req.body;

    try {
         const user = await d_rsb.count({
            attributes:['RSB_Surname'],
            where:{
              RSB_Surname:RSB_Surname
          }
        });
if(user == 0){
        await d_rsb.create({
          RSB_Name:RSB_Name,
          RSB_Surname:RSB_Surname

        });
         res.status(400).json({msg: " RSB Inserted Successfully"});
       }else{
         res.status(400).json({msg: " RSB_Surname already exists"});

       }
}
     catch (error) {
       console.log(error);
    }
}

//
export const Zsb = async(req, res) => {
    const {ZSB_Name,ZSB_Surname,RSB_Name } = req.body;
    try {
        const name =await d_rsb.findOne({
        attributes:['RSB_Id'],
         where:{
             RSB_Name: RSB_Name
         }
      });
      console.log(name.toJSON());
const n=name.toJSON()
      // const RSB_Id= name.toJSON({RSB_Id});
      const RSB_Id= n.RSB_Id;

      console.log(RSB_Id);

      // const name=Select RSB_Id from d_rsb Where RSB_Name=RSB_Name;
        await d_zsb.create({
          // ZSB_Id: ZSB_Id,
          ZSB_Name:ZSB_Name,
          ZSB_Surname:ZSB_Surname,
          RSB_Id: RSB_Id
    //       attributes: {
    //     include: [
    //        [sequelize.literal('(SELECT RSB_Id FROM "d_rsb"
    //         WHERE "d_rsb"."RSB_Name" = RSB_Name)'), 'totalAmount']
    //     ]
    // }
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Bank = async(req, res) => {
    const {Bank_Name, Branch,IFSC } = req.body;
    try {
        await d_bank.create({
          Bank_Name: Bank_Name,
          Branch:Branch,
          IFSC:IFSC
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Rank = async(req, res) => {
    const {Service_Name,Rank_Category,Rank } = req.body;
    try {
      const s_Id =await single_values.findOne({
      attributes:['id'],
       where:{
           Value: Service_Name
       }
    });
    const n1=s_Id.toJSON()
    const service_Id= n1.id;

    const RC_Id =await single_values.findOne({
    attributes:['id'],
     where:{
         Value: Rank_Category
     }
  });
  const n2=RC_Id.toJSON()
  const rank_Category_Id= n2.id;

        await d_rank.create({
          Service_Id:service_Id,
          Rank_Category_Id:rank_Category_Id,
          Rank_Name:Rank
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const District = async(req, res) => {
    const { ZSB_Name, State, Dist, Dist_Code } = req.body;
    try {
        const name =await d_zsb.findOne({
        attributes:['ZSB_Id'],
         where:{
             ZSB_Name: ZSB_Name
         }
      });
      console.log(name.toJSON());
    const n=name.toJSON()
      const ZSB_Id= n.ZSB_Id;
      const name1 =await d_state.findOne({
      attributes:['State_Surname'],
       where:{
           State: State
       }
      });
      console.log(name1.toJSON());
      const n1=name1.toJSON()
      // const RSB_Id= name.toJSON({RSB_Id});
      const State_Surname= n1.State_Surname;
        await d_district.create({
          ZSB_Id: ZSB_Id,
          State_Surname:State_Surname,
          District:Dist,
          Dist_Surname: Dist_Code
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const MedicalCategory = async(req, res) => {
    const { Service,Medical_Category } = req.body;
    try {
      const name =await single_values.findOne({
      attributes:['Id'],
       where:{
           Value: Service
       }
    });
    console.log(name);
    const n=name.toJSON()
    const Service_Id= n.Id;
        await d_medical_category.create({
          Service_Id: Service_Id,
          Discharge_Med_Cat:Medical_Category
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const RecordOfficeArmy = async(req, res) => {
    const { Corps_Name,Record_Office_Name,Location, Dist, Mail,Mobile } = req.body;
    try {
      const name =await single_values.findOne({
      attributes:['Id'],
       where:{
           Value: Corps_Name
       }
    });
    console.log(name);
    const n=name.toJSON()
    const Corps_Id= n.Id;

    const name1 =await d_district.findOne({
    attributes:['Dist_Surname'],
     where:{
         District: Dist
     }
  });
     const n1=name1.toJSON()
     const Dist_Surname= n1.Dist_Surname;

        await d_record_office_army.create({
          Corps_Name: Corps_Id,
          Record_Office_Name:Record_Office_Name,
          Record_Office_Location:Location,
          Dist_Surname: Dist_Surname,
          Record_Office_Mail:Mail,
          Record_Office_Mobile:Mobile
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const State = async(req, res) => {
    const { RSB_Name, State_Surname,State } = req.body;
    try {
      const name =await d_rsb.findOne({
      attributes:['RSB_Id'],
       where:{
           RSB_Name: RSB_Name
       }
    });
const n=name.toJSON()
    // const RSB_Id= name.toJSON({RSB_Id});
    const RSB_Id= n.RSB_Id;
        await d_state.create({
          RSB_Id: RSB_Id,
          State_Surname:State_Surname,
          State:State
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Taluk = async(req, res) => {
    const { Taluk_Name,Taluk_Surname,Dist } = req.body;
    try {
      const name =await d_district.findOne({
      attributes:['Dist_Surname'],
       where:{
           District: Dist
       }
    });
const n=name.toJSON()
    const Dist_Surname= n.Dist_Surname;
        await d_taluk.create({
          Taluk_Name: Taluk_Name,
          Taluk_Surname:Taluk_Surname,
          Dist_Surname:Dist_Surname
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
export const Trade = async(req, res) => {
    const { Service_Id, Group_Name,Trade_Name } = req.body;
    try {
        await d_trade.create({
          Service_Id: Service_Id,
          Group_Name:Group_Name,
          Trade_Name:Trade_Name
        });
        res.json({msg: "Insert Successful"});
    } catch (error) {
        console.log(error);
    }
}
//get request
export const F_rsb = async(req, res) => {
  try {
      const frsb = await d_rsb.findAll();
      res.json(frsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_zsb = async(req, res) => {
  try {
      const fzsb = await d_zsb.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_bank = async(req, res) => {
  try {
      const fzsb = await d_bank.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_MedicalCat = async(req, res) => {
  try {
      const fzsb = await d_medical_category.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_Rank = async(req, res) => {
  try {
      const fzsb = await d_rank.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_State= async(req, res) => {
  try {
      const fzsb = await d_state.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_District = async(req, res) => {
  try {
      const fzsb = await d_district.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_Taluk = async(req, res) => {
  try {
      const fzsb = await d_taluk.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}
export const F_Trade = async(req, res) => {
  try {
      const fzsb = await d_trade.findAll();
      res.json(fzsb);
  } catch (error) {
      console.log(error);
  }
}

export const F_RegCategory = async(req, res) => {
  try {
      const frsb = await d_reg_category.findAll();
      res.json(frsb);
  } catch (error) {
      console.log(error);
  }
}

export const F_RecordOfficeArmy = async(req, res) => {
  try {
      const frsb = await d_record_office_army.findAll();
      res.json(frsb);
  } catch (error) {
      console.log(error);
  }
}
export const Filter = async(req, res) => {
    // const { Service_No, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;
let Attribute=req.query.Attribute
let Name=req.query.Name
// const query='Service_Name: Army'
// let Query=req.query.Query

    try {
        const filter=await u_service_details.findAll({

            where:{
          [Attribute]: Name
          }
        });
        res.json(filter);
    } catch (error) {
        console.log(error);
    }
}
// export const ReactFilter = async(req, res) => {
//     // const { Service_No, Dep_Name, Relation, Dep_DOB,Dep_Adhaar,Dep_Qualification, Dep_Academic_Yr, Dep_Employment_Status, Dep_Marital_Status } = req.body;
// // let Attribute=req.query.Attribute
// // let Name=req.query.Name
// // const query='Service_Name: Army'
// // let Query=req.query.Query
//
//     try {
//         const filter=await u_service_details.findAll({
//
//           //   where:{
//           // [Attribute]: Name
//           // }
//         }); u_personal_details.findAll({
//             });
//         res.json(filter);
//     } catch (error) {
//         console.log(error);
//     }
//     // try {
//     //     const filter2=await u_personal_details.findAll({
//     //
//     //       //   where:{
//     //       // [Attribute]: Name
//     //       // }
//     //     });
//     //     res.json(filter2);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// }
export const ReactFilter = async(req, res) => {
    try {
      //error
        // const filter=await u_service_details.findAll({
        //   where: {Service_No: "so98765na"},
        //
        //   include: [{
        //     model: u_personal_details,
        //     where: {Service_No: "so98765na"}
        //    }]
        //     });
        // res.json(filter);
        //working wrongly
        // const [filter, metadata] = await db.query(
        //   "SELECT * FROM u_service_details JOIN u_personal_details ON u_service_details.Service_No = u_personal_details.Service_No"
        // );
        //
        // console.log(JSON.stringify(filter, null, 2));
        // res.json(filter);
        //not working
//         u_service_details.hasMany(u_personal_details);
//         u_personal_details.belongsTo(u_service_details);
//         const filter = await u_personal_details.findAll({where:{Service_Id:"so98765"}, include:{ model: u_service_details,where:{Service_Id:"so98765"}, required: true}, });
//
// console.log(JSON.stringify(filter, null, 2));
res.json(filter);
    } catch (error) {
        console.log(error);
    }

}
