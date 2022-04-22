const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

const task_controller = require("../controllers/task.controller");
const login = require("../middleware/checkLogin")

router.get("/test", task_controller.test);
router.get("/get-todos", login.log_in,task_controller.getTodos);
router.post("/add-todos",login.log_in, task_controller.addTodos);
router.put("/:id/update-todos",login.log_in, task_controller.updateTodos);
router.delete("/delete-todos", login.log_in,task_controller.deleteTodos);
router.post("/register-user",task_controller.userRegistration)
router.post("/login-user", task_controller.login_user)


module.exports = router;
