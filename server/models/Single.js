import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const single_values = db.define('single_values',{

    Item:{
        type: DataTypes.STRING
    },

    Value:{
        type: DataTypes.STRING
    },


},
{   createdAt:false,
    updatedAt:false,
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default single_values;
