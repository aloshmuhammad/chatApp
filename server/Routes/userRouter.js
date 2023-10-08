import express from "express";
import {
  userRegister,
  userLogin,
  fetchMessage,
  getAllusers,
} from "../Controllers/userController.js";

var router = express.Router();

//register
router.post("/register", userRegister);

//login
router.post("/login", userLogin);

//fetch messages
router.get("/messages/:userId", fetchMessage);

router.get("/people", getAllusers);

export default router;
