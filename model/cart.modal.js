import pool from "./dbConfig.js";
export default class Cart {
    constructor(id, userId, productId) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
    }


    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into cart(userId,productId) values(?,?)";
                    con.query(sql, [this.userId, this.productId], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    reject(err);
            })
        })
    }
    isProductExist() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from cart where userId=? and productId=?";
                    con.query(sql, [this.userId, this.productId], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    reject(err);
            })
        })
    }


    listCart(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select product.title,product.price,product.discountPercentage,product.rating,product.stock,product.brand,product.thumbnail,cart.productId from product inner join cart on product.id=cart.productId where cart.userId=? ";
                    con.query(sql, [userId], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    reject(err);
            })
        })
    }
    static removeProductFromCart(userId, productId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "delete from cart where productId=? and userId=?"
                    con.query(sql, [productId, userId], (err, result) => {
                        err ? reject(err) : resolve(result)
                    })
                }
                else
                    reject(err)
                con.release()
            })
        })
    }
    static clearCart(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "delete from cart where userId=?";
                    con.query(sql, [userId], ((err, result) => {
                        err ? reject(err) : resolve(result)
                    }))
                }
                else
                    reject(err)
            })
        })
    }
}