import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

const keysecret = "12345678912345678912345678912345"

var checkUserAuth = async (req, res, next) => {
 
  try {
    const token = req.headers.authorization;
    // console.log("token",token);

    const verifytoken = jwt.verify(token,keysecret);
    // console.log("verifytoken",verifytoken);

    const rootUser = await UserModel.findOne({_id:verifytoken._id});
    // console.log("rootuser",rootUser);

    if(!rootUser) {throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next();


  } catch (error) {
    res.status(401).json({status:401,message:"Unauthorized no token provide"})
  }

}

export default checkUserAuth