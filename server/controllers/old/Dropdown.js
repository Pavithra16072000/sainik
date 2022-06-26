import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

import Rank from "../models/Dropdown/RankModel.js";
import Record_Office_Army from "../models/Dropdown/Record_Office_ArmyModel.js";
import Service from "../models/Dropdown/Service_NameModel.js";
import Trade from "../models/Dropdown/TradeModel.js";
import single_values from "../models/Single.js";


import u_service_details from "../models/ServiceModel.js";
import u_contact_details from "../models/ContactModel.js";
import u_employment_details from "../models/EmploymentModel.js";
import u_spouse_details from "../models/SpouseModel.js";
import u_dependent_details from "../models/DependentModel.js";
import u_widow_details from "../models/WidowModel.js";
import u_pension_details from "../models/PensionModel.js";
import u_personal_details from "../models/PersonalModel.js";
import u_status_details from "../models/StatusModel.js";




export const Religion_D = async(req, res) => {
  try {
      const religion = await single_values.findAll({
          attributes:['Value'],
          where:{
              Item: 'Religion'
          }
      });
      res.json(religion);
  } catch (error) {
      console.log(error);
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%     Crops-->Drop_Down  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Corp_D = async(req, res) => {
  try {
      const crop = await single_values.findAll({
          attributes:['Value'],
          where:{
              Item: 'Religion'
          }
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
      const record = await Record_Office_Army.findAll({
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
      const rank = await Rank.findAll({
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
      const trade = await Trade.findAll({
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
      const characters =  await single_values.findAll({
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

// %%%%%%%%%%%%%%%%%%%%%%%%     Caste_Category-->Drop_Down       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const Caste_D = async(req, res) => {
  try {
      const caste =  await single_values.findAll({
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
