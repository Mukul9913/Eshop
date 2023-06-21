import pool from './dbConfig.js';
export default class Category {
    constructor(id, categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    static getList() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select*from category";
                    con.query(sql, (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    reject(err);
            });
        });
    }
}