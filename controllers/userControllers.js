const UserModel = require("../models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Generate a random secret key for JWT signing
const tokenSecretKey = crypto.randomBytes(64).toString("hex");

// signup controller
module.exports.signup = (req, res) => {
  // console.log(req.body);

  // Check if the email already exists
  UserModel.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        const newUser = new UserModel({
          email: req.body.email,
          password: req.body.password,
        });

        newUser
          .save()
          .then(() => {
            res.status(200).json({ message: "Signup success" });
          })
          .catch((err) => {
            res.status(500).json({ message: "Signup error" });
          });
      }
    })
    .catch((err) => {
      res.status(402).json({ message: "Database error" });
    });
}; // <-- Close the signup function here

//signin controller
module.exports.signin = (req, res) => {
  console.log(req.body.email);

  // Find the user by email
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || user.password !== req.body.password) {
        res.status(404).json({ message: "Invalid email or password" });
      } else {
        const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey);
        res.status(200).json({
          email: user.email,
          message: "User found",
        //   token: "yourAuthTokenHere",
          token: loginToken,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Database error" });
    });
}; // <-- Close the signin function here

//display list controller
module.exports.display = async (req, res) => {
  try{
  const usersData = await UserModel.find({}, "email password _id");
  res.json(usersData);
} catch (error) {
  console.error(error);
res.status(500).json({ message: 'An error occurred' });
}
}

// Get a user by ID
module.exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    res.status(200).json({ message: 'User found successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// delete list controller
module.exports.deleteItem = async (req, res) => {
    try {
      const _id = req.params.id;
      const deletedUser = await UserModel.findByIdAndDelete(_id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  // Update a list item by ID
  module.exports.updateItem = async (req, res) => {
    try {
      const _id = req.params.id;
      const updatedUserData = req.body;
  
      const updatedUser = await UserModel.findByIdAndUpdate(_id, updatedUserData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  // patch API for updating user data
module.exports.updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(_id, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
