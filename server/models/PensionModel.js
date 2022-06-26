import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_pension_details = db.define('u_pension_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Unit_Last_Served:{
        type: DataTypes.STRING
    },
    Discharge_Date:{
        type: DataTypes.STRING
    },
    Discharge_Reason:{
        type: DataTypes.STRING
    },
    Discharge_Med_Cat:{
        type: DataTypes.STRING
    },
    Discharge_Character:{
      type: DataTypes.STRING
    },
    Discharge_Book_No:{
        type: DataTypes.STRING
    },
    If_Pensioner:{
        type: DataTypes.STRING
    },
    PPO_No:{
        type: DataTypes.STRING
    },
    Pension_Sanctioned:{
        type: DataTypes.STRING
    },
    If_Sanctioned_Dis_Pension:{
        type: DataTypes.STRING
    },
    Disability_Pension:{
        type: DataTypes.STRING
    },
    Disability_Percentage:{
        type: DataTypes.STRING
    },
    Pension_AC_No:{
        type: DataTypes.STRING
    },
    Bank_Name:{
        type: DataTypes.STRING
    },
    Branch:{
        type: DataTypes.STRING
    },
    IFSC:{
        type: DataTypes.STRING
    },
  // },  {
  //     timestamps: false
  //   });
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_pension_details;
