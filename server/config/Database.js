import { Sequelize } from "sequelize";

const db = new Sequelize('login_reg', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
