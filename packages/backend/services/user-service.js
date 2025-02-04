import mongoose from "mongoose";
import userModel from "../models/user.js";

async function getUsers(name, job) {
  try {
    let promise;
    if (name === undefined && job === undefined) {
      promise = await userModel.find();
    } else if (name && !job) {
      promise = await findUserByName(name);
    } else if (job && !name) {
      promise = await findUserByJob(job);
    }
    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const promise = await userToAdd.save();
    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUserByName(name) {
  try {
    return await userModel.find({ name: name });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUserByJob(job) {
  try {
    return await userModel.find({ job: job });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  addUser,
  deleteUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};