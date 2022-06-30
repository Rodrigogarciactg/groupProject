const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Requires a file with a key
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;

const register = async (req,res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log('NEW USER', newUser);
        const userToken = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        }, SECRET );
        res
            .status(201)
            .cookie('userToken', userToken, {
                expires: new Date(Date.now() + 10000000),
            })
            .json({
                successMessage: 'user created',
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
            })
    } catch(err) {
        res
            .status(400)
            .json({
                message: 'Something went wrong in register',
                error: err
            });
    }
};

const login = async (req, res) => {
    const userDoc = await User.findOne({ email: req.body.email});
    if (!userDoc) {
        res.status(400).json({ message: 'Invalid Login'});
    } else {
        try {
            const isPasswordValid = bcrypt.compare(req.body.password,userDoc.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Invalid Login'});
            } else {
                const userToken = jwt.sign({
                    _id: userDoc._id,
                    email: userDoc.email,
                    username: userDoc.username,
                }, SECRET );
                res
                    .cookie('userToken', userToken, {
                        expires: new Date(Date.now() + 10000000),
                    })
                    .json({
                        successMessage: 'user logged in',
                        user: {
                            _id: userDoc._id,
                            email: userDoc.email,
                            username: userDoc.username,
                        },
                    });
            }
        } catch(err) {
            res.status(400).json({ message: 'Invalid Login'});
        }
    }
};

const logout = (req, res) => {
    res.clearCookie('userToken');
    res.json({ message: 'You are logged out' });
};

const getLoggedInUser = async (req, res) => {
    try {
        const userPayLoad = jwt.verify(req.cookies.userToken,SECRET)
        console.log('USER', userPayLoad);
        const user = await User.findOne({ _id: userPayLoad._id });
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            }
        })
    } catch(err) {
        res.status(400).json({ message: 'Invalid Login'})
    }
};

const getUsers = async (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json(allUsers);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in user:findAll', error: err });
        });
}





module.exports = { //Controls for User
    register,
    login,
    logout,
    getLoggedInUser,
    getUsers,
};