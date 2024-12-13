const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { secret } = require("../config/jwt");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user.id, role: user.role }, secret);
    res.header("Authorization", token).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
