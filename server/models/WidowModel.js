import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const u_widow_details = db.define('u_widow_details',{

    Service_No:{
        type: DataTypes.STRING
    },
    Widow_Reg_No:{
        type: DataTypes.STRING
    },
    Family_Pension:{
        type: DataTypes.STRING
    },
    W_Nxt_Kin:{ 
        type: DataTypes.STRING
    },
    Death_Date:{
        type: DataTypes.STRING
    },
    Death_Nature:{
        type: DataTypes.STRING
    },
    ESM_No:{
      type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default u_widow_details;
