import Orderitems from "../model/order-item.modal.js";
import orderDetail from "../model/order.modal.js";
import Cart from "../model/cart.modal.js";


export const save = (request, response) => {
    let cartItems = JSON.parse(request.body.cartItems);

    let totalBillAmount = cartItems.reduce((previous, current) => {
        return previous + current.price * current.qty;
    }, 0)
    const { contactPerson, contactNumber, deliveryAddress } = request.body;
    let date = Date().toString().substring(4, 15).replaceAll(' ', '-');
    let userId = request.session.user.id;
    ;
    let paymentmode = "COD";
    let orderId = Date.now();
    let order = new orderDetail(orderId, userId, date, totalBillAmount, contactPerson, contactNumber, deliveryAddress, "recieved", paymentmode)
    order.save().then(result => {
        Orderitems.save(cartItems, orderId).then(result => {

            Cart.clearCart(userId).then(result => {
                orderDetail.getOrderByUserId(userId).then(result => {
                    console.log(result)
                    return response.render("order-history.ejs", {
                        currentUser: request.session.user
                        , OrderHistory: result

                    })
                }).catch(err => {
                    console.log(chalk.bgRedBright(err));
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(chalk.bgRedBright(err));
        });
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    });
}
export const OrderHistory = (request, response, next) => {
    let userId = request.session.user.id;
    orderDetail.getOrderByUserId(userId).then(result => {
        return response.render("order-history.ejs", {
            currentUser: request.session.user,
            OrderHistory: result
        })

    }).catch(err => { console.log(err) })
}
export const OrderById = (request, response, next) => {
    let orderId = request.params.orderId;
    orderDetail.OrderByOrderId(orderId).then(result => {
        // console.log(result)
        return response.render("orderProduct.ejs", { orderProduct: result, currentUser: request.session.user.id })
    }).catch(err => {
        console.log(err)
    })
}