import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateManagerKey } from "../utils/generateManagerKey.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: [8, "Password must have at least 8 characters."],
    maxLength: [32, "Password cannot have more than 32 characters."],
    select: false,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    default: "Add your bio",
  },
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["Manager", "Employee"],
    required: true,
  },
  organizationName: {
    type: String,
    required: function () {
      return this.role === "Manager";
    },
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  managerKey: {
    type: String,
    unique: true,
    sparse: true,
  },
  linkedManagerKey: {
    type: String,
    required: function () {
      return this.role === "Employee";
    },
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  
  resetPasswordOtp: {
    type: String,
  },
  resetPasswordOtpExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Conditionally add fields only for managers
userSchema.add({
  noOfLinkedEmp: {
    type: Number,
    
  },
  totalNoOfTaskCreated: {
    type: Number,
    
  },
  
});


// Fields only for employees
userSchema.add({
  totalNoOfAssignTask: {
    type: Number,
    
  },
  totalCompletedTasks: {
    type: Number,
    
  },
  totalAcceptedTasks: {
    type: Number,
  },
  totalRejectedTasks: {
    type: Number,
  },
  totalPendingTasks: {
    type: Number,
  },
  totalFailedTasks: {
    type: Number,
  },
  performance: {
    type: Number, // Store performance as percentage
    
  },
  grade: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Bad"],
    
  },
});

// Virtual for DateOfBirth
userSchema.virtual("DateOfBirth").set(function (dob) {
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  const m = new Date().getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
    this.age = age - 1;
  } else {
    this.age = age;
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.role === "Manager" && !this.managerKey) {
    this.managerKey = await generateManagerKey();
  }

  // Ensure organizationName is required for managers
  if (this.role === "Manager" && !this.organizationName) {
    const error = new Error("Organization name is required for managers.");
    return next(error);
  }

  // Assign organizationName for employees based on their linked manager's key
  if (this.role === "Employee" && this.isModified("linkedManagerKey")) {
    const manager = await this.constructor.findOne({ managerKey: this.linkedManagerKey });
    if (manager && manager.role === "Manager") {
      this.organizationName = manager.organizationName;
    } else {
      const error = new Error("Invalid manager key or manager not found.");
      return next(error);
    }
  }

  if (!this.age) {
    const error = new Error("Date of birth is required to calculate age.");
    return next(error);
  }

  if (this.role === "Manager") {
    // Remove Employee-specific fields from Manager documents
    this.totalNoOfAssignTask = undefined;
    this.totalCompletedTasks = undefined;
    this.totalAcceptedTasks = undefined;
    this.totalRejectedTasks = undefined;
    this.totalPendingTasks = undefined;
    this.totalFailedTasks = undefined;
    this.performance = undefined;
    this.grade = undefined;

    // Ensure Manager-specific fields exist
    this.noOfLinkedEmp = this.noOfLinkedEmp || 0;
    this.totalNoOfTaskCreated = this.totalNoOfTaskCreated || 0;
  } else if (this.role === "Employee") {
    // Remove Manager-specific fields from Employee documents
    this.noOfLinkedEmp = undefined;
    this.totalNoOfTaskCreated = undefined;

    // Ensure Employee-specific fields exist
    this.totalNoOfAssignTask = this.totalNoOfAssignTask || 0;
    this.totalCompletedTasks = this.totalCompletedTasks || 0;
    this.totalAcceptedTasks = this.totalAcceptedTasks || 0;
    this.totalRejectedTasks = this.totalRejectedTasks || 0;
    this.totalPendingTasks = this.totalPendingTasks || 0;
    this.totalFailedTasks = this.totalFailedTasks || 0;
    this.performance = this.performance || 0;
    this.grade = this.grade || "Bad";
  }

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);

    return parseInt(firstDigit + remainingDigits);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000;

  return verificationCode;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);