const mongoose = require("mongoose")

const educationalDetailSchema = new mongoose.Schema({
  education: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  passOutYear: {
    type: String,
    required: true,
  },
});

const TechnicalDetailsSchema = new mongoose.Schema({
    skills: {
      type: String,
      required: true,
    },
    languages: {
        type: String,
        required: true,
    },
    project:{
        type : String,

    },
    projectLink:{
        type : String,
    }

})


const TechnicalSkillsSchema = new mongoose.Schema({
  technicalDetails: [TechnicalDetailsSchema],
  experience: {
    type: String,
    required: true,
  },
  salaryExpectation: {
    type: String,
    required: true,
  },
  profileSummary: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({

    userID:{
        type : String,
        required : true,
        
    },
  PersonalInfo: {
    dob: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    currentCity: {
      type: String,
      required: true,
    },
    currentDistrict: {
      type: String,
      required: true,
    },
    currentCountry: {
      type: String,
      required: true,
    },
  },
  EducationalDetails: [educationalDetailSchema],
  TechnicalSkills: TechnicalSkillsSchema,
});

const StudentInfo = mongoose.model("StudentInfo", studentSchema);
module.exports = StudentInfo;