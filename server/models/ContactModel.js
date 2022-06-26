import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_contact_details = db.define('u_contact_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    House_No:{
        type: DataTypes.STRING
    },
    House_Name:{
        type: DataTypes.STRING
    },
    Street:{
        type: DataTypes.STRING
    },
    Pincode:{
        type: DataTypes.STRING
    },
    Police_Station:{
      type: DataTypes.STRING
    },
    Tele_No:{
        type: DataTypes.STRING
    },
    P_House_No:{
        type: DataTypes.STRING
    },
    P_House_Name:{
        type: DataTypes.STRING
    },
    P_Street:{
        type: DataTypes.STRING
    },
    P_Pincode:{
        type: DataTypes.STRING
    },
    P_Police_Station:{
        type: DataTypes.STRING
    },


},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_contact_details;
