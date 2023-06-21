// import Category from "../model/category.model.js";
import Category from "../model/category.modal.js";
import Product from "../model/product.model.js";
import User from "../model/user.modal.js";
import { validationResult } from "express-validator";


export const indexPage = (request, response, next) => {
    Promise.all([Product.getList(), Category.getList()])
        .then(result => {
            // console.log(result);
            return response.render("index.ejs", {
                productList: result[0],
                categoryList: result[1],
                currentUser: request.session.user,
                message: ""
            })
        })
        .catch(err => {
            console.log(chalk.bgRedBright(err));
        });
}
export const signinPage = (request, response, next) => {
    return response.render("signIn.ejs", { message: "" })
}
export const signupPage = (request, response, next) => {
    return response.render("signUp.ejs")
}

export const signUp = (request, response, next) => {
    let user = new User(null, request.body.name, request.body.email,
        request.body.password, request.body.contact);
    user.save().then(result => {
        return response.render("signIn.ejs", { message: "" })
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    })
}

export const signIn = (request, response, next) => {
    let user = new User()
    let { email, password } = request.body;
    user.email = email;
    user.password = password;
    user.signin().then(result => {
        if (result.length) {
            request.session.user = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email
            };
            return response.redirect("/")
        }
        else
            return response.render("signIn.ejs"), { message: "Invalid Email id or Password" }
    }).catch(err => {
        console.log(err)
    })
}
export const signout = (request, response, next) => {
    request.session.user = null;
    request.session.destroy();
    return response.redirect("/");
}