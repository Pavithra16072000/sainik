import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_spouse_details = db.define('u_spouse_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Marital_Status:{
        type: DataTypes.STRING
    },
    Marriage_Date:{
        type: DataTypes.STRING
    },
    Spouse_Name:{
        type: DataTypes.STRING
    },
    Spouse_Relation:{
        type: DataTypes.STRING
    },
    Spouse_DOB:{
      type: DataTypes.STRING
    },
    Spouse_Id_Mark:{
        type: DataTypes.STRING
    },
    Spouse_Qualification:{
        type: DataTypes.STRING
    },
    Spouse_Emp_Status:{
        type: DataTypes.STRING
    },
    Spouse_Emp_Profession:{
        type: DataTypes.STRING
    },
    Spouse_Retirement_Date:{
        type: DataTypes.STRING
    },
    Spouse_Adhaar:{
        type: DataTypes.STRING
    },
    Spouse_Voter_Id:{
        type: DataTypes.STRING
    },
    Spouse_PAN:{
        type: DataTypes.STRING
    },
    Spouse_CSD:{
        type: DataTypes.STRING
    },
    Spouse_ECHS:{
        type: DataTypes.STRING
    },

},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_spouse_details;
