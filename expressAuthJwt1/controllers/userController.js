import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class UserController {
  static userRegistration = async (req, res) => {
    // console.log(req.body);
    console.log("registartion api..");

    const { name, email, password , password_confirmation} = req.body

    if(!name || !email || !password || !password_confirmation){
        res.status(422).json({error:"fill all the details.."})
    }
    try {
      const preuser = await UserModel.findOne({ email: email });
      if (preuser) {
        res.status(422).json({ error: "This Email is Already Exist" })
    } else if (password !== password_confirmation) {
        res.status(422).json({ error: "Password and Confirm Password Not Match" })
    }
    else{
      const finalUser = new UserModel({
        name, email, password, password_confirmation
    });

    // here password hasing

    const storeData = await finalUser.save();
    console.log("storedata",storeData);

    res.status(201).json({ status: 201, storeData })
    }

    } catch (error) {
      
    }
  }

  static userLogin = async (req, res) => {
    // console.log(req.body);
    console.log("login api..");

    const { email, password } = req.body

    if(!email || !password){
      
        res.status(422).json({error:"fill all the details.."})
    }

    try {
      const userValid = await UserModel.findOne({ email: email });

      if(userValid){
        const isMatch = await bcrypt.compare(password,userValid.password);

        if(!isMatch){
          res.status(422).json({ error: "invalid details"})
      }
      else{
        const token = await userValid.generateAuthtoken();
        // console.log(token);

        res.cookie("usercookie",token,{
          expires:new Date(Date.now()+9000000),
          httpOnly:true
      });

      const result = {
        userValid,
        token
    }

    res.status(201).json({status:201,result})
      }


      }
      
    } catch (error) {
      
    }
  }


//   static authlogin = async (req, res) => {
//   console.log("authlogin api..");

//   try {
//     const ValidUserOne = await userdb.findOne({_id:req.userId});
//     res.status(201).json({status:201,ValidUserOne});
// } catch (error) {
//     res.status(401).json({status:401,error});
// }

//   }

  // static userRegistration = async (req, res) => {
  //   console.log("register data..");
  //   const { name, email, password} = req.body
  //   const user = await UserModel.findOne({ email: email })
  //   if (user) {
  //     res.send({ "status": "failed", "message": "Email already exists" })
  //   } else {
  //     if (name && email && password ) {
       
  //         try {
  //           const salt = await bcrypt.genSalt(10)
  //           const hashPassword = await bcrypt.hash(password, salt)
  //           const doc = new UserModel({
  //             name: name,
  //             email: email,
  //             password: hashPassword
  //           })
  //           await doc.save()
  //           console.log("loginsave",doc);
  //           const saved_user = await UserModel.findOne({ email: email })
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
  //         } catch (error) {
  //           console.log(error)
  //           res.send({ "status": "failed", "message": "Unable to Register" })
  //         }
         
  //     } else {
  //       res.send({ "status": "failed", "message": "All fields are required" })
  //     }
  //   }
  // }

  // static userLogin = async (req, res) => {
  //   console.log("login api..");
  //   try {
  //     const { email, password } = req.body
  //     if (email && password) {
  //       const user = await UserModel.findOne({ email: email })
  //       if (user != null) {
  //         const isMatch = await bcrypt.compare(password, user.password)
  //         if ((user.email === email) && isMatch) {
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.send({ "status": "success", "message": "Login Success", "token": token })
  //         } else {
  //           res.send({ "status": "failed", "message": "Email or Password is not Valid" })
  //         }
  //       } else {
  //         res.send({ "status": "failed", "message": "You are not a Registered User" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Unable to Login" })
  //   }
  // }

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://localhost:3000/auth/ResetPassword/${user._id}/${token}`
        // console.log(link)
        // // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Sapphire - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }
}

export default UserController