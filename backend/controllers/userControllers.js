const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


// @desc    Register new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all fields")
    }
    //check if user exist
    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400)
        throw new Error("User already exists!")
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


// @desc    Authenticate a user.. login
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    //Check for User email
    const user = await User.findOne({email})

    //check password
    if (user && (await bcrypt.compare(password, user.password))){ //user.password is the hashed password in our db
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})


// @desc    Get User Data
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {              /*we'l use dis to protect our route using a custom authMiddleware*/
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({id: _id, name, email})
})


//Generate a token (JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
}