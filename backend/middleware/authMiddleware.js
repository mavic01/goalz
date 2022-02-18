const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1] //.split turns it into an array and the 1 index is the token itself

            //Verify the token.. jwt.veryfy allows us access the payload ie. id-- cos its what we signed ie. jwt.sign({id}).. it could be anything
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token cos the token has the user id as the payload
            req.user =  await User.findById(decoded.id).select("-password")               /**we assign it to req.user so we can access req.user from any route thats protected.. .select() - exclude the password */

            //cos at the end of a middle, we wanna call the next piece of middleware
            next() 
        } catch (e) {
            console.log(e);
            res.status(401)  /*401 - not authorized*/
            throw new Error("Not authorized")
        }
    }                 /**PS: in http headers, we hv AUTHORIZATION OBJECTS */
    
    if(!token){
        res.status(401)  /*401 - not authorized*/
        throw new Error("Not authorized, no token")
    }
})

module.exports = protect //used in routes.. in postman, either in header or auth- bearer token