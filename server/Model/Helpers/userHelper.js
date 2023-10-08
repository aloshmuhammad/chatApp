import User from "../Schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Message from "../Schemas/messageSchema.js";
dotenv.config();
const registerUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ username: data.username });
      if (existingUser) {
        reject({
          message: "User Already Found",
        });
      } else {
        const newUser = await User.create(data);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        resolve({ message: "User Registered Sucessfully", newUser, token });
      }
    } catch (error) {
      throw new Error("Error occured during registering the user");
    }
  });
};
const validateLogin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validUser = await User.findOne({ username: data.username });
      if (validUser) {
        bcrypt.compare(data.password, validUser.password).then((status) => {
          if (status) {
            const token = jwt.sign(
              { userId: validUser._id },
              process.env.JWT_SECRET
            );

            resolve({
              message: "User Loggedin Successfully",
              validUser,
              token,
            });
          } else {
            reject({
              message: "Wrong password",
            });
          }
        });
      } else {
        reject({
          message: "User Not Found",
        });
      }
    } catch (error) {
      throw new Error("Error occured during the login");
    }
  });
};
const getUserDetails = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

const getMessage = async (userId, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET);

      const CurrentuserId = userData.userId;
      const messages = await Message.find({
        sender: { $in: [userId, CurrentuserId] },
        recipient: { $in: [userId, CurrentuserId] },
      }).sort({ createdAt: 1 });
      resolve(messages);
    } catch (error) {
      throw new Error("Error occured during fetching the messages");
    }
  });
};

const getEveryUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const people = await User.find({}, { _id: 1, username: 1 });

      resolve(people);
    } catch (error) {
      throw new Error("Error occured during fetching the Users");
    }
  });
};
export {
  registerUser,
  validateLogin,
  getUserDetails,
  getMessage,
  getEveryUsers,
};
