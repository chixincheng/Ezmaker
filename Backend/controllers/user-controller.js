require('dotenv').config();
const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  process.env.USER,
    pass: process.env.PASS
  }
});


// when resetting a new password, the frontend will send 2 http requests: resetpassword and updateuser
resetPassword = async (req, res) =>{
    var mailOptions = {
        from: process.env.USER,
        to: req.query.email,
        subject: req.query.subject ,
        text: req.query.text
      };
      
      const { email } = req.query;
      if( !email  ){
          return res.status(400)
                      .json({ errorMessage: "Please enter email." });
      }
     await User.findOne({ email: email }, async (err, user)=>{
         if (err) throw err;

         if( !user ){
            return res.status(400)
                      .json({ errorMessage: "User with given email not found." });
         }

         let newHashPassword = await bcrypt.hash(req.query.newPassword, 8);
         user.passwordHash = newHashPassword;
         user.save().then(()=>{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(400).json({
                    success: false,
                    error: error,
                  })
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.status(200).json({
                    success: true,
                    message: 'Email sent!'
                  })
                }
              });
         });

     } );
      
}

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.cookies._id });
        if (!loggedInUser){
            return res.status(201).json({
                loggedIn: false,
                errorMessage:"User with given token not exist."
            });
        }
        else{
            return res.status(200).json({
                loggedIn: true,
                user: loggedInUser
            });
        }

       
    })
}

// check
loginUser = async(req, res) => {
    try {
        console.log(req.query);
        const { email,password } = req.query;
        if( !email){
            return res.status(201)
                        .json({ errorMessage: "Please enter email or username." });
        }
        if ( !password) {
            return res.status(201)
                        .json({ errorMessage: "Please enter password." });
        }
      
        
        var user = await User.findOne({ email: email });
        if(!user){
            user = await User.findOne({ userName: email  });
        }

        if ( !user ) {
            return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "An account with this email  or username does not exists."
                });
        }

        bcrypt.compare(password, user.passwordHash, async (err, result) => {
            if (err) {
              throw err;
            }

            if( result ){
                // LOGIN THE USER
                const token = auth.signToken(user);
                await res.cookie("token", token, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "none"
                            }).cookie("_id",user._id,{httpOnly: true,
                                secure: true,
                                sameSite: "none"}).status(200).json({
                        success: true,
                    user: user
                        }).send();
            }
            else{
                return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "Password not correct!"
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
// register a new user based on the given information
// check
registerUser = async (req, res) => {
    try {
        res.send("--------"+req);
        const { firstName, lastName, userName, email, password, passwordVerify } = req.query;
        console.log(firstName);
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
        
        let passwordHash = await bcrypt.hash(password, 8);
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
//==change password and password reset can be handled here
updateUser = async (req, res) => {
    const body = req.query
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, async (err, user) => {
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
        if( !body.password ){
            user.passwordHash = body.passwordHash;
        }
        else{
            user.passwordHash = await bcrypt.hash(body.password, 8);
        }
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
                    user: user
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
    res.clearCookie("_id", { httpOnly: true, sameSite: 'none', secure: true } );
    res.send({
      authenticated: false,
      token: null,
    });

}

deleteUser = async (req, res) => {
    User.findById({ _id: req.query.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        User.findOneAndDelete({ _id: req.query.id }, () => {
            return res.status(200).json({ success: true, data: user })
        }).catch(err => console.log(err))
    })
}


module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    logoutUser,
    resetPassword,
    deleteUser
}