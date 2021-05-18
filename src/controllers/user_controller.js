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
export const signup = async ({ email, password, authorName }) => {
  if (!email || !password || !authorName) {
    throw new Error('You must provide email, password and author name');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }

  // 🚀 TODO:
  // here you should use the User model to create a new user.
  // this is similar to how you created a Post
  // and then save and return a token
  const user = new User();
  user.email = email;
  user.password = password;
  user.authorName = authorName;
  await user.save();
  return tokenForUser(user);
};

export const updateUser = async (user, postFields) => {
  // await updating a post by id
  // return *updated* post
  try {
    if (postFields.newEmail && postFields.newAuthorName) {
      let pass = user.password;
      if (postFields.newPass) pass = postFields.newPass;
      await User.findByIdAndUpdate(user._id, {
        password: pass,
        email: postFields.newEmail,
        authorName: postFields.newAuthorName,
      });
      const returnUser = await User.findById({ _id: user._id });
      if (returnUser) return returnUser;
      else return new Error(`Can not update user ${user.email}`);
    } else {
      return new Error(`Can not update user ${user.email}`);
    }
  } catch (error) {
    throw new Error(`update user error: ${error}`);
  }
};
