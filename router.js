import express from "express";
import os from "os";

const router = express.Router();

const getUsers = (req, res) => {
  const users = [
    {
      name: "hossein",
      family: "bajan",
    },
  ];
  res.json(users);
};

const createUser = (req, res) => {
  console.log(os.cpus());

  res.json([
    {
      data: req.body,
      os: os.cpus(),
      os_length: os.cpus().length
    },
  ]);
};

router.get("/users", getUsers);

router.post("/users", createUser);

export default router;
