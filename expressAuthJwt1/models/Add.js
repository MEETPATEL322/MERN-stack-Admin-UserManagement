import mongoose from "mongoose";

const AddSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    hobbie:{
        type:String,
        required:true
    },

})

const AddModel = mongoose.model('AddData', AddSchema)

export default AddModel
