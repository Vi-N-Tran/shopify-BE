import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (user) => {
  return tokenForUser(user);
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ email, password, owner }) => {
  if (!email || !password || !owner) {
    throw new Error('You must provide email, password and owner name');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  const user = new User();
  user.email = email;
  user.password = password;
  user.owner = owner;

  await user.save();
  return tokenForUser(user);
};

// Get all the pics of a particular user
export const getUser = async (userId) => {
  try {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new Error('Can\'t find user');
    } else {
      return foundUser.populate('picsLiked').populate('picsOwn');
    }
  } catch (error) {
    throw new Error(`get user Pics error: ${error}`);
  }
};

export const updateUser = async (userId, newUserData) => {
  try {
    if (newUserData) {
      await User.findByIdAndUpdate(userId, {
        picsLiked: newUserData.picsLiked,
        picsOwn: newUserData.picsOwn,
      });

      const returnUser = await User.findById({ _id: userId });
      if (returnUser) return returnUser;
      else return new Error('Can not update user');
    } else {
      return new Error('Can not update user');
    }
  } catch (error) {
    throw new Error(`update user error: ${error}`);
  }
};
