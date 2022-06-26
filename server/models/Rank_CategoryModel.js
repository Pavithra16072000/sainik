import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const d_rank_category = db.define('d_rank_category',{
    Rank_Category_Id:{
        type: DataTypes.TINYINT
    },

    Rank_Category:{
        type: DataTypes.STRING(30)
    },
},{
    createdAt : false,
    updatedAt : false,
    freezeTableName:true
});
d_rank_category.removeAttribute('id');


(async () => {
    await db.sync();
})();

export default d_rank_category;
