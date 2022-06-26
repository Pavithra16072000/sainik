import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const MyUsers = db.define('u_user_reg',{
    Name:{
        type: DataTypes.STRING
    },
    Service_No:{
        type: DataTypes.STRING
    },


    Mail_Id:{
        type: DataTypes.STRING
    },
    Mobile:{
        type: DataTypes.STRING
    },
    Password:{
        type: DataTypes.STRING
    },
    Reg_Date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW

    },
    Status:{
        type: DataTypes.STRING,
        defaultValue: "Not Submitted"
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default MyUsers;
