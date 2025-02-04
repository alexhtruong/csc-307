// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const { addUser, deleteUser, getUsers, findUserById, findUserByName, findUserByJob } = userService;

dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;

  try {
    let result;
    if (name && job) {
      result = await getUsers(name, job);
    } else if (name) {
      result = await findUserByName(name);
    } else if (job) {
      result = await findUserByJob(job);
    } else {
      result = await getUsers();
    }
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = await findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});

app.post("/users", async (req, res) => {
    const userToAdd = req.body;
    await addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await deleteUser(id);
    if (user) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});