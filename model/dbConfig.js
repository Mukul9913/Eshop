import mysql from "mysql2";
export default mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql@1399",
    database: "e_shop",
    connectionLimit: 10
});