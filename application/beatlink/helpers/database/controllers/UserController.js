// helpers/database/controllers/userController.js
import bcrypt from 'bcrypt'; 
import signale from 'signale';
import { connect, disconnect } from '../database.js';
import { User } from '../models/user.js';

export const findUser = async (username) => {
  try {
      await connect();
      const user = await User.findOne({ username: username });
    
      if (!user) {
          throw new Error('No user found with this username');
      }

      return user; 
  } catch (error) {
      signale.error("Authentication Error:", error);
      throw error;
  }
};

export const findUserById = async (userId) => {
  try {
      await connect();
      const user = await User.findById(userId);
    
      if (!user) {
          throw new Error('No user found with this userId');
      }

      return user; 
  } catch (error) {
      signale.error("Authentication Error:", error);
      throw error;
  }
};

export const createUser = async (userObject) => {
    try {
      await connect();
      
      // Check if username or email already exists
      const existingUser = await User.findOne({
        $or: [
          { username: userObject.username },
          { email: userObject.email },
        ],
      });
  
      // If an existing user is found, throw an error
      if (existingUser) {
        const errorField = existingUser.username === userObject.username ? 'Username' : 'Email';
        throw new Error(`${errorField} already exists`);
      }
      
      // Proceed with creating the new user if no duplicates are found
      const newUser = new User({
        email: userObject.email,
        username: userObject.username,
        password: userObject.password, 
        birthday: userObject.birthday,
      });
  
      await newUser.save();
      signale.success("User Created");
  
    } catch (error) {
      signale.error("Error Creating User:", error);
      throw error; 
    }
  };