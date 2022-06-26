import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_Dfile_details = db.define('u_Dfile_details',{

    service_no:{
        type: DataTypes.STRING
    },
    Name:{
        type: DataTypes.STRING
    },
    Adhar:{
        type: DataTypes.STRING
    },
    PAN:{
        type: DataTypes.STRING
    },
    ECHS:{
        type: DataTypes.STRING
    },
    Voter:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_Dfile_details;
