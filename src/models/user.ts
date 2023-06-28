import mongoose from 'mongoose';

export interface IUser {
    name?: string;
    about?: string;
    avatar?: string;
    email: string;
    password: string;
  }

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        minlength: 2,
        maxlength: 30
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 200
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        select: false,
      }
});

export default mongoose.model('user', userSchema); 