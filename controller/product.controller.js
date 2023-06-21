
import chalk from "chalk";
import Category from "../model/category.modal.js";
import Product from "../model/product.model.js";
export const productView = (request, response, next) => {
    Product.findById(request.params.id).then(result => {
        // console.log(result[0]);
        return response.render("productView.ejs", {
            currentUser: request.session.user.currentUser,
            productList: result[0]
        });
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    })
}
export const allProduct = (request, response, next) => {
    Promise.all([Product.getList(), Category.getList()])
        .then(result => {
            // console.log(result);
            return response.render("product.ejs", {
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
export const productByCategory = (request, response, next) => {
    let categoryName = request.params.categoryName;
    Promise.all([Product.getProductByCategory(categoryName), Category.getList()])
        .then(result => {
            // console.log(result);
            return response.render("product.ejs", {
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
export const search = (request, response, next) => {
    let keyword = request.params.keyword;
    Product.getProductByKeyword(keyword).then(result => {
        return response.status(200).json({ productList: result })
    }).catch(err => {
        console.log(chalk.bgRedBright(err));
    })
}