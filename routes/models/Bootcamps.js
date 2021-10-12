const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "name cannot be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "add a description"],
    trim: true,
    maxlength: [400, "name cannot be more than 50 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "please use a valid url",
    ],
  },
  phone: {
    type: String,
    maxlength: [12, "cannot be more than 12 characters long "],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
      "please enter a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "please enter an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  formattedAddress: String,
  street: String,
  city: String,
  zipcode: {
    type: Number,
    required: [true, "please enter a valid zipcode"],
    maxlength: 6,
  },
  country: String,
  career: {
    type: [String],
    required: true,
    enum: [
      "Web Developement",
      "UI/UX",
      "Mobile Developement",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "the minimum value of rating must be 1"],
    max: [10, "the rating cannnot be over 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  accpetGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

modules.exports = mongoose.model("Bootcamp", BootcampSchema);
