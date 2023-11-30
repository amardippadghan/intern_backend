const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    }
    ,
    firstName:{
        type : String ,
        required : true
    }
    ,
    lastName:{
        type : String ,
        required : true

    },
    email:{
        type : String ,
        required : true
    },
    jobtitle:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    },
    companyPhoneNumber:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    }
    ,
    companyName:{
        type : String ,
        required : true
    }
    ,
    companyLocation:{
        type : String ,
        required : true
    }
    ,
    Discription:{
        type:String , 
        required : true
    }
   
    







})



const employer = mongoose.model('employer',employerSchema);
module.exports = employer;