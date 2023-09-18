const express = require("express");
const auth = require("../../auth/authService");
const bcrypt = require("bcryptjs");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
} = require("../models/usersAccessDataService");

const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const router = express.Router();

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, anotherPassword) =>
  bcrypt.compareSync(password, anotherPassword);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateRegistration(user);
    if (error) return res.status(400).send(error);

    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);

    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateLogin(user);
    if (error) res.status(400).send(error);
    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      res
        .status(400)
        .send(
          "Authorization Error: You must be an admin user to see all users in the database"
        );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;

    if (_id !== id && !isAdmin)
      res
        .status(400)
        .send(
          "Authorization Error: You must be an admin type user or the registered user to see this user details"
        );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.user;

    if (userId !== user._id)
      res
        .status(400)
        .send(
          "Authorization Error: You must be the registered user to update its  details"
        );

    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send(error);

    const normalizedUser = normalizeUser(req.body);
    const newUser = await updateUser(userId, normalizedUser);

    return res.send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (id !== user._id && !user.isAdmin)
      res
        .status(400)
        .send(
          "Authorization Error: You must bean an admin type user or the registered user to update its business status"
        );

    const changedStatusUser = await changeUserBusinessStatus(id);
    return res.send(changedStatusUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (id !== user._id && !user.isAdmin)
      res
        .status(400)
        .send(
          "Authorization Error: You must be an admin type user or the registered user to delete this user"
        );

    const userDeleted = await deleteUser(id);
    return res.send(userDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
