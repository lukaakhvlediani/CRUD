const Task = require("../models/task.model");
const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const signature = process.env.JWT_SECRET

exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

exports.getTodos = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).send({
      message: "ok",
      data: tasks,
    });
  } catch (error) {
    console.log(error.message, "catch error getTodos");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.addTodos = async (req, res) => {
  try {
    const { name, checked } = req.body;

    const newTask = new Task({ name, checked });
    const resultSave = await newTask.save();

    return res.status(200).send({
      message: "ok",
      data: resultSave,
    });
  } catch (error) {
    console.log(error.message, "catch error addTodos");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.updateTodos = async (req, res) => {
  try {
    const { name, checked } = req.body;
    const { id } = req.params;

    const response = await Task.updateOne({ _id: id }, { name, checked });

    return res.status(200).send({
      message: "ok",
      data: response,
    });
  } catch (error) {
    console.log(error.message, "catch error updateTodos");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const { ids } = req.body;
    const response = await Task.deleteMany({ _id: ids });

    return res.status(200).send({
      message: "ok",
      data: response,
    });
  } catch (error) {
    console.log(error.message, "catch error deleteTodos");

    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};
exports.userRegistration = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const user = await User.findOne({ email });
    const bcrypt = require("bcryptjs")

  
    const saltRounds = 10
    
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        throw saltError
      } else {
        bcrypt.hash(password, salt, function(hashError, hash) {
          if (hashError) {
            throw hashError
          } else {
            console.log(hash)
            //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
          }
        })
      }
    })

    if (user) {
      return res
        .status(400)
        .send({ message: "A user has already registered with this email" });
    } 
      const newUser = new User({
        userName,
        email,
        password
      });
      
      await newUser.save();
      console.log(newUser)  
      return res.status(200).send({ message: "ok", data: {email,userName}});
      
    
  } catch (error) {
    console.log(error.message, "catch error userRegistration");
    return res.status(500).send({
      message: error.message,
      data: null,
    });
  }
};

exports.login_user = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send('user does not exists')
    }
    const passwordcompare = await bcrypt.compare(password, user.password)
    if (!passwordcompare)
      return res.status(400).send({ status: 'error', error: error.message })
    const data = {
      id: user._id,
      email: user.email
    }
    const userToken = jwt.sign({ data }, signature)
    user.token = userToken
    await user.save()
    return res.status(200).send({
      message: 'OK',
      data: {
        email: user.email,
        token: user.token,
        id: user._id
      }
    })
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}