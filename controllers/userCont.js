//Controller incharge or adding and removing Users from the database
// Dev: Vishal Vaid

//TODO: GetAll Users function (GET) 
//TODO: Add Users function (POST)
//TODO: Remove Users function (DELETE)
//TODO: Update Users function (PUT)
//TODO: Get Users by ID function or by name (GET)



const User = require("../schemas/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
 
// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Validate request body against schema
    const { userFirstName, userLastName, password, email } = req.body;
    if (!userFirstName || !userLastName || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
 
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    // Create a new user instance with hashed password
    const newUser = new User({
      userFirstName,
      userLastName,
      password: hashedPassword,
      email,
    });
 
    // Save the new user to the database
    await newUser.save();
 
    // Respond with the created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle validation errors and database errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteContact = async (req, res) => {
    try{

      const user = await User.findByIdAndDelete(req.params.id);
      if(!user) {
        return res.status(404).send("usernot found");
      }
      res.status(200).json(user);
    } 
    catch (error){
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send("Invalid User ID");
      }
      req.status(500).json({error: error.message});
    }

  };

  exports.updateUser = async (req, res) => {
    try {
      const { userFirstName, userLastName, password, email } = req.body;
   
      // Construct the update object
      const updateFields = {};
      if (userFirstName) updateFields.userFirstName = userFirstName;
      if (userLastName) updateFields.userLastName = userLastName;
      if (email) updateFields.email = email;
   
      // Hash the password if it exists in the request body
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashedPassword;
      }
   
      // Update the user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true, runValidators: true }
      );
   
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
   
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send("Invalid User ID");
      }
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  };

  exports.getUser = async (req, res) => {
    try{
      const user = await User.findById(req.params.id);
      if(!user) {
        return res.status(404).send("user not found");
      }
      res.status(200).json(user);
    }
    catch(error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).send("Invalid user id");
      }
      res.status(500).json({error: error.message})
    }
  };