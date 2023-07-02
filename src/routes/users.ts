import { Router } from "express";
// import User from '../models/user';
import { getUsers, getUserById, createUser } from "../controllers/users";

// const User = require('../models/user');
const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/users", createUser);

export default router;
