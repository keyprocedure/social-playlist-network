// helpers/database/controllers/userController.js
import bcrypt from 'bcrypt'; 
import signale from 'signale';
import { connect, disconnect } from '../database.js';
import { User } from '../models/user.js';

export const findUser = async (username, password) => {
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

export const createUser = async (userObject) => {
  try {
      await connect();
      
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

