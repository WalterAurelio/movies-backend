import mongoose, { Schema } from 'mongoose';
import { AddFavMovieBody } from '../interfaces/movies.interfaces';

const movieSchema = new Schema<AddFavMovieBody>({
  adult: Boolean,
  genre_ids: [Number],
  id: Number,
  poster_path: String,
  release_date: String,
  title: String,
  vote_average: Number
});

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
  favorites: {
    movies: AddFavMovieBody[];
    tvShows: number[];
  }
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
  resetPasswordTokenExpiresAt: Date,
  favorites: {
    movies: [movieSchema],
    tvShows: [Number]
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;