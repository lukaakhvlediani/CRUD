const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

const task_controller = require("../controllers/task.controller");

router.get("/test", task_controller.test);
router.get("/get-todos", task_controller.getTodos);
router.post("/add-todos", task_controller.addTodos);
router.put("/:id/update-todos", task_controller.updateTodos);
router.delete("/delete-todos", task_controller.deleteTodos);
router.post("/register-user",task_controller.userRegistration)

module.exports = router;
