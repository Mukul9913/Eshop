export const verify = (request, response, next) => {
    if (request.session.user)
        next();
    else
        return response.render("signIn.ejs")
}