import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_Sfile_details = db.define('u_Sfile_details',{

    service_no:{
        type: DataTypes.STRING
    },

    PPO:{
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

export default u_Sfile_details;
