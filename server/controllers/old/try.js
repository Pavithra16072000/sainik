import { Sequelize } from "sequelize";

const Op = Sequelize.Op;
import MyUsers from "../models/UserModel.js";
import u_service_details from "../models/ServiceModel.js";
import u_contact_details from "../models/ContactModel.js";

export const Dropdown = async(req, res) => {
  try {
      const users = await u_service_details.findAll({
          attributes:['Service_No','Service_Name','Corps_Name','Record_Office_Name','Group_Name', 'Trade_Name', 'Rank_Name', 'Name', 'Gender', 'DOB', 'Enroll_Date', 'World_War2', 'Opt_Attend' ,'Deco'],
          // where:{
          //     Service_No: "p98765k"
          // }
      });
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
