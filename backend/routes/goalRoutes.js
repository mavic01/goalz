const router = require("express").Router()
const {getGoals, setGoals, updateGoals, deleteGoals} = require("../controllers/goalControllers")
const protect = require("../middleware/authMiddleware.js")

router.route("/").get(protect, getGoals).post(protect, setGoals)
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals)

// router.get("/", getGoals) - both were replaced by the code above
// router.post("/", setGoals)l

// router.put("/:id", updateGoals) - also replaced
// router.delete("/:id", deleteGoals)

module.exports = router