// src/models/user.model.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// This interface defines the structure of a User document in MongoDB
// It extends the Mongoose Document interface to include custom fields
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  enrolledCourses: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrolledCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model<IUser>('User', userSchema);
export default User;