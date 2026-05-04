const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const todos = require("../todos/todos.query");


router.get("/",auth,  todos.gettodos);
router.get("/:id",auth, todos.todosid);
router.post("/",auth, todos.posttodos);
router.put("/:id", auth,todos.puttodosid);
router.delete("/:id", auth, todos.deletetodos);

module.exports = router;
