const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
exports.registerUser = async(req, res) => {
    try{
        const {fullName, email, password, confirmPassword} = req.body;

        // Validation
        if(!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({message: 'All fields are required'});
        }
        if(password != confirmPassword){
            return res.status(400).json({message: 'Passwords do not match'});
        }

        // Check if email exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already in use"});
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// Login Controller
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Validate input
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        // Find User with given email
        // const user = await User.findOne({email});
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }else{
            return res.status(200).json({message: "User found with email"})
        }

        // // Check Password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch){
        //     return res.status(400).json({message: "Invalid Credentials"});
        // }

        // // Generate JWT
        // const token = jwt.sign(
        //     {id: user.id},
        //     process.env.JWT_SECRET,
        //     {expiresIn: "7d"}
        // );

        // res.json({token, user: {id: user._id, fullName: user.fullName, email: user.email}});
    }catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message, message: "Server error"});
    }
};