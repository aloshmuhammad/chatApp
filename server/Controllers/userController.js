import {
  registerUser,
  validateLogin,
  getMessage,
  getEveryUsers,
} from "../Model/Helpers/userHelper.js";
import bcrypt from "bcrypt";
const userRegister = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = req.body;

    registerUser(data)
      .then((response) => {
        console.log(response, "ok");
        res.cookie("token", response.token).status(201).json(response);
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    validateLogin(req.body)
      .then((response) => {
        console.log(response, "op");
        res.cookie("token", response.token).status(200).json(response);
      })
      .catch((error) => {
        console.log(error, "er");
        res.status(401).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const fetchMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.cookies?.token;

    getMessage(userId, token).then((response) => {
      console.log(response, "lastmsg");
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const getAllusers = async (req, res) => {
  try {
    getEveryUsers().then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

export { userRegister, userLogin, fetchMessage, getAllusers };
