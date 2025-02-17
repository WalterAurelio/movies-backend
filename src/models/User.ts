import mongoose, { Schema } from 'mongoose';

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: {
    User: number;
    Admin?: number;
    Editor?: number; 
  };
  refreshToken: string[];
  isVerified: boolean;
  lastLogin: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Admin: Number,
    Editor: Number
  },
  refreshToken: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;