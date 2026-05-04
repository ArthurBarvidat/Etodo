const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const query = require("./user.query.js");


router.get('/user', auth, query.getUser);
router.get('/user/todos', auth, query.getUserTodos);
router.get('/users/:identifier', auth, query.getUserByIdOrEmail);
router.put('/users/:id', auth, query.updateUserById);
router.delete('/users/:id', auth, query.deleteUserById);

module.exports = router;
