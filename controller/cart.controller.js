import express from "express"
import { verify } from "../public/middleware/authenticate.js";
import Cart from "../model/cart.modal.js";
import session from "express-session";

export const addToCart = (request, response, next) => {
    let userId = request.params.userId * 1 - 1555;
    let productId = request.params.productId * 1 - 2222;
    // console.log(userId + "  " + productId)
    let cart = new Cart();
    cart.userId = userId;
    cart.productId = productId;

    cart.isProductExist().then(result => {
        console.log(result);
        if (!result.length) {
            console.log(result)
            cart.save().then(result => {
                return response.json({ message: "Product Added Sucessfully" })
            }).catch(err => {
                console.log(chalk.bgRedBright(err));
            })
        }
        else {
            return response.json({ message: "Product Already Exist in cart" })
        }
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    })

}
export const cartList = (request, response, next) => {
    let cart = new Cart()
    // console.log
    let userId = request.session.user.id;
    cart.listCart(userId).then(result => {
        // console.log(result)

        return response.render("cart.ejs", {
            currentUser: request.session.user,
            cartItems:
                JSON.parse(JSON.stringify(result)),
            message: "",
        })
    }).catch(err => {
        console.log(err)
    })

}

export const loadCart = (request, response, next) => {
    let userId = request.session.user.id;
    let cart = new Cart()
    cart.listCart(userId).then(result => {
        // console.log(result)
        return response.status(200).json(result);
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    })
}
export const removeProduct = (request, response, next) => {
    let userId = request.session.user.id;
    let productId = request.params.productId;
    Cart.removeProductFromCart(userId, productId).then(result => {
        return response.redirect("/cart/cartList")
    }).catch(err => {
        console.log(err)
    })
}
