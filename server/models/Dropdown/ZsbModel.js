import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_zsb = db.define('d_zsb',{
    ZSB_Id:{
        type: DataTypes.TINYINT
    },
    ZSB_Name:{
        type: DataTypes.STRING(30)
    },
    ZSB_Surname:{
        type: DataTypes.STRING(6)
    },
    
    RSB_Id:{
        type: DataTypes.TINYINT
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});
d_zsb.removeAttribute('id');


(async () => {
    await db.sync();
})();

export default d_zsb;
