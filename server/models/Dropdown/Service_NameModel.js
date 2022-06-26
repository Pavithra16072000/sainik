import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_service = db.define('d_service',{
    Service_Id:{
        type: DataTypes.TINYINT
    },
    Service_Name:{
        type: DataTypes.STRING(15)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});
d_service.removeAttribute('id');


(async () => {
    await db.sync();
})();

export default d_service;
