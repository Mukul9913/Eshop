import pool from "./dbConfig.js"
export default class Orderitems {
    constructor(id, orderDetailId, productId, qty) {
        this.id = id;
        this.orderDetailId = orderDetailId;
        this.productId = productId;
        this.qty = qty;
    }

    static save(cartItems, orderId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into order_items(orderDetailsId,productId,qty)values(?,?,?)"
                    cartItems.forEach(items => {
                        // console.log(items.productId + "dfoghdojsrnerothsdofgdo")
                        con.query(sql, [orderId, items.productId, items.qty], (err, result) => {
                            if (err)
                                reject(err);

                        })
                    });
                    resolve();

                }
                else
                    reject(err);
            })
        })
    }
    static OrderByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select order_items.qty,product.title,product.brand,product.description,product.thumbnail,order_detail.date,order_detail.billAmount,order_detail.deliveryAddress,order_detail.id from order_detail inner join order_items on order_detail.id = order_items.orderdetailsId inner join product on product.id=order_items.productId where orderdetailsId = ?;"
                    con.query(sql, [orderId], ((err, result) => {
                        err ? reject(err) : resolve(result)
                    }))
                }
                else
                    reject(err)
            })
        })
    }

}


