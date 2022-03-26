const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                userName: loggedInUser.userName,
                email: loggedInUser.email,
                userName: loggedInUser.userName,
                authentication: loggedInUser.authentication,
                profilePictureID: loggedInUser.profilePictureID
            }
        }).send();
    })
}

//Needs change
loginUser = async(req, res) => {
    try {
        const { email, username ,password } = req.body;
        if( !email && !username ){
            return res.status(201)
                        .json({ errorMessage: "Please enter email or username." });
        }
        if ( !password) {
            return res.status(201)
                        .json({ errorMessage: "Please enter password." });
        }
      
        
        let hashedPassword = await bcrypt.hash(password, 8);
        var response = null;
        if( email ){
            response = await User.findOne({ email: email, password: hashedPassword });
        }
        else{
            response = await User.findOne({ userName: username, password: hashedPassword  });
        }
        
        if ( !response ) {
            return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "An account with this email  or username does not exists."
                });
        }
       

        // LOGIN THE USER
        const token = auth.signToken(response);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: response
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
// register a new user based on the given information
registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify || !userName) {
            return res.status(201)
                        .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res.status(201)
                    .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(201)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        //email must be unique
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        //username must be unique
        const exists = await User.findOne({ userName: userName });
        if (exists) {
            return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "An account with this user name already exists."
                })
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, userName, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                userName: savedUser.userName,
                email: savedUser.email,
                _id: savedUser._id,
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
//==
getUserById = async (req, res) => {
    await User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.log(err))
}
//==change password can be handled here
updateUser = async (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        console.log("User found: " + JSON.stringify(user));
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }

        

        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.userName = body.userName;
        user.email = body.email;
        user.passwordHash = body.passwordHash;
        user.authication = body.authentication;
        user.profilePictureID = body.profilePictureID;

        user
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}



logoutUser = async (req,res)=>{
    res.clearCookie("token", { httpOnly: true, sameSite: 'none', secure: true } );

    res.send({
      authenticated: false,
      token: null,
    });
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    logoutUser
}