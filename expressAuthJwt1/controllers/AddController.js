import AddModel from '../models/Add.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
import path from 'path';

import fs from 'fs';
import csv from 'fast-csv'

class AddController {
  static addRegister = async (req, res) => {
    console.log("add data..", req.file);

    const file = req.file.filename;

    const { fname, lname, email, mobile, gender, location, jobdest, status, hobbie, country, countryisocode, stateisocode, state, city } = req.body


    if (!fname || !lname || !email || !mobile || !gender || !location || jobdest || !status || !file || !hobbie || !country || !state || !city) {

      res.status(401).json("Alll input required..")
    }

    try {
      const preuser = await AddModel.findOne({ email: email });
      if (preuser) {
        res.status(401).json("This user already exist in our databse")
      } else {
        const userData = new AddModel({
          fname, lname, email, mobile, gender, location, jobdest, status, image: file, hobbie, country, state, city, countryisocode, stateisocode
        });
        await userData.save();
        res.status(200).json(userData);
      }
    } catch (error) {
      res.status(401).json(error);
      console.log("catch block error")
    }

  };
  static getRegister = async (req, res) => {
    console.log("get list..");

    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 10;

    const query = {
      fname: { $regex: search, $options: "i" }
    }
    if (gender !== "All") {
      query.gender = gender
    }
    if (status !== "All") {
      query.status = status
    }
    try {
      // console.log(req.query);
      const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4
      const count = await AddModel.countDocuments(query);
      const userdata = await AddModel.find(query)
        .sort({ _id: -1 })
        .limit(ITEM_PER_PAGE)
        .skip(skip);
      const pageCount = Math.ceil(count / ITEM_PER_PAGE);
      res.status(200).json({
        Pagination: {
          count, pageCount
        },
        userdata
      })
      // console.log(userdata);
    } catch (error) {
      res.status(401).json(error);
    }


  }
  static updateRegister = async (req, res) => {
    console.log("update api..");

    const { id } = req.params;

    const { fname, lname, email, mobile, gender, location, status, user_profile, hobbie, country, state, city, countryisocode, stateisocode } = req.body;
    const file = req.file ? req.file.filename : user_profile

    try {
      const updateuser = await AddModel.findByIdAndUpdate({ _id: id }, {
        fname, lname, email, mobile, gender, location, status, image: file, hobbie, country, state, city, countryisocode, stateisocode
      }, {
        new: true
      });
      await updateuser.save();
      console.log("update", updateuser);
      res.status(200).json(updateuser);
    } catch (error) {
      res.status(401).json(error)
    }

  }
  static deleteRegister = async (req, res) => {
    console.log("delete api..");

    const { id } = req.params;

    try {
      const deletuser = await AddModel.findByIdAndDelete({ _id: id });
      res.status(200).json(deletuser);
    } catch (error) {
      res.status(401).json(error)
    }

  }
  static getsingleRegister = async (req, res) => {
    console.log("get singleapi..");

    const { id } = req.params;


    try {

      const userindividual = await AddModel.findById({ _id: id });
      // console.log(userindividual);
      res.status(200).json(userindividual)

    } catch (error) {
      res.status(401).json(error);
    }
  }
  static status = async (req, res) => {
    console.log("status api..");
    const { id } = req.params;
    const { data } = req.body;

    try {
      const userstatusupdate = await AddModel.findByIdAndUpdate({ _id: id }, { status: data }, { new: true });
      res.status(200).json(userstatusupdate)
    } catch (error) {
      res.status(401).json(error)
    }
  }

  static exportdata = async (req, res) => {
    console.log("export api..");

    try {

      const usersdata = await AddModel.find();

      const csvStream = csv.format({ headers: true });

      if (!fs.existsSync("public/files/export/")) {
        if (!fs.existsSync("public/files")) {
          fs.mkdirSync("public/files/");
        }
        if (!fs.existsSync("public/files/export")) {
          fs.mkdirSync("./public/files/export/");
        }
      }

      const writablestream = fs.createWriteStream(
        "public/files/export/users.csv"
      );

      csvStream.pipe(writablestream);

      writablestream.on("finish", function () {
        res.json({
          downloadUrl: `http://localhost.:8000/files/export/users.csv`,
        });
      });

      if (usersdata.length > 0) {
        usersdata.map((user) => {
          csvStream.write({
            FirstName: user.fname ? user.fname : "-",
            LastName: user.lname ? user.lname : "-",
            Email: user.email ? user.email : "-",
            Hobbie: user.hobbie ? user.hobbie : "-",
            Phone: user.mobile ? user.mobile : "-",
            Gender: user.gender ? user.gender : "-",
            Status: user.status ? user.status : "-",
            Image: user.image ? user.image : "-",
            Location: user.location ? user.location : "-",
          })
        })
      }
      csvStream.end();
      writablestream.end();

    } catch (error) {
      res.status(401).json(error)
    }

  }
  static deleteManyRegister = async (req, res) => {
    console.log("delete Many api..");

    // const { id } = req.body;
    console.log(req.body)
    let id = req.body.ids

    try {
      const deletuser = await AddModel.deleteMany({ _id: id });
      res.status(200).json(deletuser);
    } catch (error) {
      res.status(401).json(error)
    }

  }
}

export default AddController