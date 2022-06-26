import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_employment_details = db.define('u_employment_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Reg_Type:{
        type: DataTypes.STRING 
    },
    Service_Name:{
        type: DataTypes.STRING
    },
    Corps_Name:{
        type: DataTypes.STRING
    },
    Record_Office_Name:{
        type: DataTypes.STRING
    },
    Group_Name:{
      type: DataTypes.STRING
    },
    Trade_Name:{
        type: DataTypes.STRING
    },
    Rank_Name:{
        type: DataTypes.STRING
    },
    Name:{
        type: DataTypes.STRING
    },
    Gender:{
        type: DataTypes.STRING
    },
    DOB:{
        type: DataTypes.STRING
    },
    Enroll_Date:{
        type: DataTypes.STRING
    },
    World_War2:{
        type: DataTypes.STRING
    },
    Opt_Attend:{
        type: DataTypes.STRING
    },
    Deco:{
        type: DataTypes.STRING
    },

},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_employment_details;
