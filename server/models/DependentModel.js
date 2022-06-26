import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_dependent_details = db.define('u_dependent_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Dep_Name:{
        type: DataTypes.STRING
    },
    Relation:{
        type: DataTypes.STRING
    },
    Dep_DOB:{
        type: DataTypes.STRING
    },
    Dep_Adhaar:{
        type: DataTypes.STRING
    },
    Dep_Qualification:{
        type: DataTypes.STRING
    },
    Dep_Academic_Yr:{
      type: DataTypes.STRING
    },
    Dep_Employment_Status:{
        type: DataTypes.STRING
    },
    Dep_Marital_Status:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_dependent_details;
