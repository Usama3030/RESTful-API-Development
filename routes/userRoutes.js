const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

// router.post('/items', userController.InsertUser);
// router.get('/items/:id', userController.fetchUser);
// router.get('/items', userController.fetchData);
// router.put('/items/:id', userController.updateUser);
// router.delete('/items/:id', userController.deleteUser);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/display", userController.display);
router.get("/getbyId/:id", userController.getUserById);
router.delete("/delete/:id", userController.deleteItem);
router.put("/update/:id", userController.updateItem)
router.patch('/users/:id', userController.updateUser);


module.exports = router;