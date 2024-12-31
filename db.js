const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const courseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image_url: { type: String },
  price: { type: Number },
  creatorId: { type: objectId },
});

const purchaseSchema = new Schema({
  courseId: { type: objectId },
  userId: { type: objectId },
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel: courseModel,
  purchaseModel: purchaseModel,
};
