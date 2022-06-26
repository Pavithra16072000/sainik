import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_personal_details = db.define('u_personal_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Father_Name:{
        type: DataTypes.STRING
    },
    Mother_Name:{
        type: DataTypes.STRING
    },
    Religion:{
        type: DataTypes.STRING
    },
    Caste_Category:{
        type: DataTypes.STRING
    },
    Birth_Dist_Surname:{
      type: DataTypes.STRING
    },
    Birth_Place:{
        type: DataTypes.STRING
    },
    Adhaar:{
        type: DataTypes.STRING
    },
    Voter_Id:{
        type: DataTypes.STRING
    },
    PAN:{
        type: DataTypes.STRING
    },
    CSD:{
        type: DataTypes.STRING
    },
    ECHS:{
        type: DataTypes.STRING
    },
    Id_Mark1:{
        type: DataTypes.STRING
    },
    Id_Mark2:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_personal_details;
