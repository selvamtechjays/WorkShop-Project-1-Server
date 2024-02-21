//Import section
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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


//get user by id
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error occurred while fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Forget password functionality
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "selvam.murugaiah@techjays.com",
        pass: "ouot vvqx aijl kvrc",
      },
    });

    // URL to the update password page
    const updatePasswordURL = `https://fb511de7-153d-4f0b-861f-514166d30b14-00-2p9j967szwl7l.sisko.replit.dev/updatepassword/${user._id}`;

    // Email options
    let mailOptions = {
      from: "techjays.mocktest",
      to: user.email,
      subject: "Reset Password",
      html: `<p>Please click the following link to reset your password:</p><p><a href="${updatePasswordURL}">${updatePasswordURL}</a></p>`,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error occurred during forget password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Change password functionality
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred during password change:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userSignup, userLogin, forgetPassword, changePassword,getUserDetails };
