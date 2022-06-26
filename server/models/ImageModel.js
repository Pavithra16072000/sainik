import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_image = db.define('u_image',{

    Service_No:{
        type: DataTypes.STRING
    },
    Image:{
        type: DataTypes.BLOB('Medium')
    },
    File:{
        type: DataTypes.BLOB
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_image;
