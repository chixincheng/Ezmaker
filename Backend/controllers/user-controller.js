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
          return res.status(201)
                      .json({ errorMessage: "Please enter email." });
      }
     await User.findOne({ email: email }, async (err, user)=>{
         if (err) throw err;

         if( !user ){
            return res.status(201)
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
                    errorMessage: error,
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

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
  
      return true;
  
    } else {
      return false;
  
    }
  
  }
// register a new user based on the given information
// check
registerUser = async (req, res) => {
    try {
        
        const { firstName, lastName, userName, email, password, passwordVerify, profilePicture } = req.query;
        
        if (!firstName || !lastName || !email || !password || !passwordVerify || !userName) {
            return res.status(201)
                        .json({ errorMessage: "Please enter all required fields." });
        }

        if( userName === password  ){
            return res.status(201)
                        .json({ errorMessage: "Username can not be same as password." });
        }

        if( email === password  ){
            return res.status(201)
                        .json({ errorMessage: "Email can not be same as password." });
        }

        if( !ValidateEmail(email) ){
            return res.status(201)
                        .json({ errorMessage: "Please enter a valid email." });
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
            firstName, lastName, userName, email, passwordHash, profilePicture
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
        console.log("error: ");
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
    console.log(body);
    var existingUser = true;
    var validateEmail = false;
       
        //email must be unique
        if( body.email ){
            existingUser = await User.findOne({ email: body.email });
             validateEmail = ValidateEmail(body.email);
        }
       
        
   
    if (!body) {
        return res.status(400).json({
            success: false,
            errorMessage: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, async (err, user) => {
        console.log("User found: " + JSON.stringify(user));
        if (err) {
            return res.status(404).json({
                err,
                errorMessage: 'User not found!',
            })
        }

      
        if( body["firstName"] !== undefined  ){
            if( body.firstName.length < 1 ){
                return res.status(201).json({
                    
                    errorMessage: 'First name can not be empty.'
                })
            }
            else{
                user.firstName = body.firstName;
            }
            
        }

        if( body["lastName"] !== undefined   ){
            if( body.lastName.length < 1 ){
                return res.status(201).json({
                    
                    errorMessage: 'Last name can not be empty.'
                })
            }
            else{
                user.lastName = body.lastName;
            }
            
        }

        

        if( body["password"] !== undefined  ){
            if( body.password.length < 8  ){
                return res.status(201).json({
                    
                    errorMessage: 'Please enter a password of at least 8 characters.'
                })
            }
            else if( body.email === body.password ){
                return res.status(201)
                .json({ errorMessage: "Password can not be same as email." });
            }
            else if( body.userName === body.password ){
                return res.status(201)
                .json({ errorMessage: "Password can not be same as username." });
            }
            else{
                user.passwordHash = await bcrypt.hash(body.password, 8);
            }
            
        }


        if(  body["email"] !== undefined  ){
          
            if( body.email.length < 1  ){
                return res.status(201).json({
                    
                    errorMessage: 'Email can not be empty.'
                })
            }
            else if(existingUser){
                return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
            }
            else if( !validateEmail ){
                return res
                .status(201)
                .json({
                    success: false,
                    errorMessage: "Not a valid email."
                })
            }
            else{
                user.email = body.email;
            }
            
        }
       
       
        
        
        if( req.files && req.files.length > 0 ){
            user.profilePicture = req.files[0].path;
        }
      
        

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
                    errorMessage: 'User not updated!',
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