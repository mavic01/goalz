//in order not to use .then .catch or async await.. we can install and use the EXPRESS-ASYNC-HANDLER package
const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")
const User = require("../models/userModel")


// @desc    Get goals
// @route   GET api/goals
// @access  Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc    Set goals
// @route   POST api/goals
// @access  Private
const setGoals = asyncHandler(async(req, res) => {
    if (!req.body.text){
        res.status(400) //instead of using this...json({message: "Please add a text field"}).. u can use the express error handler
        throw new Error("please add a text field now")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    goal.save()
    res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal){
        res.status(400)
        throw new Error("Goal not found!")
    }


    const user = await User.findById(req.user.id)
    //Check for user
    if (!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }



    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @desc    Delete goals
// @route   DELETE api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)
    //Check for user
    if (!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
    }


    // const deletedGoal = await Goal.findByIdAndDelete(req.params.id) OR
    await goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}