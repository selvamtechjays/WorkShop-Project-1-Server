//Import section
const User = require("../models/user");
const bcrypt = require("bcrypt");

//userSignup function
const userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json("All the fields are required");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const userData = { name, email, password: hashedPassword };

    const user = new User(userData);

    // Save the user and send the response
    await user.save();
    res.status(201).json({
      message: "Signup Successfully",
      userData: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

//Login logic for user

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All inputs are required" });
    }

    // check provided email or phone number in the database
    const user = await User.findOne({ email: email });

    // If no user is found, respond with a 400 status and an "Invalid Credentials" message
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //Compare Password is match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, respond with a 401 status and an "Invalid Credentials" message
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // If login is successful, respond with a 200 status and a "Login successful" message, along with the user object
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userSignup, userLogin };
